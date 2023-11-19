# WebSocket Whiteboard App

This is a simple multiuser whiteboard application built with Python, Flask, Flask-SocketIO, and SQLite. 
Users can create, delete, and join whiteboards to collaboratively draw in real-time.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Python (3.6 or higher)
- pip (Python package installer)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/whiteboard-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd whiteboard-app
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file in the project root and configure the environment variables:

    ```env
    DATABASE_URL=sqlite:///site.db
    SECRET_KEY=your_secret_key
    ```

    Replace `your_secret_key` with a secure key for Flask sessions.

### Usage

1. Run the application:

    ```bash
    python app.py
    ```

    The application will be accessible at `http://127.0.0.1:5000/` by default.

2. Open your web browser and go to the provided URL.

3. Create a whiteboard, join existing whiteboards, and start drawing collaboratively!

## Features

- **Create Whiteboard:** Users can create a new whiteboard by providing a name.
- **Delete Whiteboard:** Owners can delete their whiteboards.
- **List Whiteboards:** View a list of existing whiteboards.
- **Real-time Collaboration:** Users can join whiteboards and draw in real-time.

## Folder Structure

- **templates:** Contains HTML templates for rendering pages.
- **.env:** Configuration file for environment variables.
- **app.py:** Main application file.

## WebSocket Events

- **connect:** Triggered when a client connects to the WebSocket server.
- **disconnect:** Triggered when a client disconnects from the WebSocket server.
- **join_whiteboard:** Triggered when a user joins a whiteboard.
- **whiteboard_joined:** Sent to a user upon successfully joining a whiteboard.
- **draw_event:** Triggered when a user draws on the whiteboard.

## Customize

Feel free to customize and extend the application based on your specific requirements. You can enhance the drawing features, add user authentication, or integrate additional functionalities.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust and expand this `ReadMe.md` based on your application's specific details and requirements.