import os
import socketio

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import cross_origin, CORS
from flask_sqlalchemy import SQLAlchemy


import eventlet  # Import the eventlet library

from user_name import generate_funky_username

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Create a new Socket.IO server
sio = socketio.Server(cors_allowed_origins="*", async_mode='eventlet')

# Attach the Socket.IO server to the Flask application
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

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
@cross_origin()
def index():
    return jsonify({'message': 'whiteboard api'})


@app.route('/whiteboard')
@cross_origin()
def list_whiteboards():
    whiteboards = Whiteboard.query.all()
    whiteboard_list = [wb_to_dict(wb) for wb in whiteboards]
    return jsonify(whiteboard_list)


@app.route('/whiteboard/create', methods=['POST'])
@cross_origin()
def create_whiteboard():
    name = request.form['name']
    wb = Whiteboard(name=name)
    db.session.add(wb)
    db.session.commit()
    return {'message': 'successfully created whiteboard', 'whiteboard': wb_to_dict(wb)}


@app.route('/whiteboard/delete', methods=['POST'])
@cross_origin()
def delete_whiteboard():
    wb_id = request.form['id']
    wb = Whiteboard.query.get(wb_id)
    if wb:
        db.session.delete(wb)
        db.session.commit()
        return {'message': 'successfully deleted whiteboard', 'whiteboard': wb_to_dict(wb)}
    return {'message': 'whiteboard not exists'}


@app.route('/whiteboard/<int:whiteboard_id>')
@cross_origin()
def whiteboard(whiteboard_id):
    wb = Whiteboard.query.get(whiteboard_id)
    if wb:
        return jsonify({'id': wb.id, 'name': wb.name, 'state': wb.state})
    return {'message': 'whiteboard not exists'}


# Define a function to handle the "message" event
@sio.event
def message(sid, data):
    print(f"Message from {sid}: {data}")
    # Send the message back to the client
    sio.send(sid, "Server received your message")


# Define a function to handle the connection event
@sio.event
def connect(sid, environ):
    print(f"Client connected: {sid}")

    # Generate a funky username for the connected user
    username = generate_funky_username()

    # Store the username in the dictionary for future reference
    user_names[sid] = username

    # Send the username back to the client
    sio.emit('username', {'username': username}, room=sid)


# Define a function to handle the "connect_to_whiteboard" event
@sio.event
def connect_to_whiteboard(sid, data):
    whiteboard_id = data.get('whiteboard_id')
    with app.app_context():
        wb = Whiteboard.query.get(whiteboard_id)
        if wb:
            # Join the room for the specified whiteboard
            sio.enter_room(sid, str(whiteboard_id))
            sio.emit('message', {'text': f'User: {user_names[sid]} Connected to whiteboard {wb.name}'}, room=whiteboard_id)
        else:
            sio.emit('message', {'text': 'Whiteboard not found'}, room=whiteboard_id)


# Define a function to handle the disconnection event
@sio.event
def disconnect(sid):
    print(f"Client disconnected: {sid}")

    # Remove the username from the dictionary upon disconnection
    if sid in user_names:
        del user_names[sid]

    # Leave any whiteboard rooms the user might have joined
    sio.leave_room(sid, None)


# Define a function to handle the "message" event
@sio.event
def draw(sid, data):
    # Broadcast the message to the room of the current whiteboard
    sio.emit('draw', {'username': user_names.get(sid, 'Unknown'), 'cords': data['cords']}, room=data['whiteboard_id'])

if __name__ == '__main__':
    # Use the eventlet server to run the Flask application with Socket.IO support
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 5000)), app)