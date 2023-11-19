import React from "react";

export const ChooseWhiteboard: React.FC = () => {
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