import React from 'react';
import {NewWhiteboard} from "../components/newWhiteboard";
import {ChooseWhiteboard} from "../components/chooseWhiteboard";

export const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Whiteboard App</h1>
            <NewWhiteboard />
            <ChooseWhiteboard />
        </div>
    );
};
