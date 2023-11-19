import os

from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit, join_room
from flask_sqlalchemy import SQLAlchemy

from user_name import generate_funky_username

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
socketio = SocketIO(app)
db = SQLAlchemy(app)

# Dictionary to store usernames
user_names = {}


# Define Whiteboard model
class Whiteboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    state = db.Column(db.PickleType, default=[])


def wb_to_dict(wb):
    return {'id': wb.id, 'name': wb.name}


# Create database tables
with app.app_context():
    db.create_all()


# Routes
@app.route('/')
def index():
    return jsonify({'message': 'whiteboard api'})


@app.route('/whiteboard')
def list_whiteboards():
    whiteboards = Whiteboard.query.all()
    whiteboard_list = [wb_to_dict(wb) for wb in whiteboards]
    return jsonify(whiteboard_list)


@app.route('/whiteboard/create', methods=['POST'])
def create_whiteboard():
    name = request.form['name']
    wb = Whiteboard(name=name)
    db.session.add(wb)
    db.session.commit()
    return {'message': 'successfully created whiteboard', 'whiteboard': wb_to_dict(wb)}


@app.route('/whiteboard/delete/<int:whiteboard_id>', methods=['POST'])
def delete_whiteboard(whiteboard_id):
    wb = Whiteboard.query.get(whiteboard_id)
    if wb:
        db.session.delete(wb)
        db.session.commit()
        return {'message': 'successfully deleted whiteboard', 'whiteboard': wb_to_dict(wb)}
    return {'message': 'whiteboard not exists'}


@app.route('/whiteboard/<int:whiteboard_id>')
def whiteboard(whiteboard_id):
    wb = Whiteboard.query.get(whiteboard_id)
    if wb:
        return jsonify({'id': wb.id, 'name': wb.name, 'state': wb.state})
    return {'message': 'whiteboard not exists'}


# WebSocket events
@socketio.on('connect')
def handle_connect():
    user_names[request.sid] = generate_funky_username()
    emit('user_name', {'user_name': user_names[request.sid]})
    print(f'User {user_names[request.sid]} connected')


@socketio.on('disconnect')
def handle_disconnect():
    user_name = user_names.pop(request.sid, None)
    if user_name:
        print(f'User {user_name} disconnected')


@socketio.on('join_whiteboard')
def handle_join_whiteboard(data):
    whiteboard_id = data['whiteboard_id']
    room = f'whiteboard_{whiteboard_id}'
    join_room(room)
    emit('whiteboard_joined', {'message': 'You have joined the whiteboard.'}, room=request.sid)
    emit('user_list', {'users': list(user_names.values())}, room=room)


@socketio.on('draw_event')
def handle_draw_event(data):
    whiteboard_id = data['whiteboard_id']
    room = f'whiteboard_{whiteboard_id}'
    emit('draw_event', data, room=room, include_self=False)


if __name__ == '__main__':
    socketio.run(app, debug=True)
