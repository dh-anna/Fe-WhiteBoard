import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Whiteboard from './whiteboard';

const NewWhiteboard: React.FC = () => {
    const [whiteboardId, setWhiteboardId] = useState<number | null>(null);

    const handleNewWhiteboard = () => {
        const newId = Math.floor(Math.random() * 1000000);
        setWhiteboardId(newId);
    };

    return (
        <div>
            <button onClick={handleNewWhiteboard}>Create New Whiteboard</button>
            {whiteboardId !== null && (
                <div>
                    <Whiteboard key={whiteboardId} width={800} height={600} />
                </div>
            )}
        </div>
    );
};

const ChooseWhiteboard: React.FC = () => {
    const handleChooseWhiteboard = (id: number) => {
        // Implement your logic for choosing a whiteboard
        console.log(`Selected whiteboard ${id}`);
    };

    return (
        <div>
            <h2>Choose a Whiteboard</h2>
            <ul>
                <li>
                    <button onClick={() => handleChooseWhiteboard(1)}>Whiteboard 1</button>
                </li>
                <li>
                    <button onClick={() => handleChooseWhiteboard(2)}>Whiteboard 2</button>
                </li>
                {/* Add more buttons for additional whiteboards */}
            </ul>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/new">New Whiteboard</Link>
                    </li>
                </ul>
            </nav>

            <Router>
                <Routes>
                    <Route path="/new" element={<NewWhiteboard />} />
                    <Route path="/" element={<ChooseWhiteboard />} />
                </Routes>
            </Router>
        </div>
    );
};

export default HomePage;
