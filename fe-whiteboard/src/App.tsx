import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/home';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>React Whiteboard</h1>
            </header>
            <main>
                <Router>
                    <Route path="/" element={<HomePage />} />
                </Router>
            </main>
        </div>
    );
}

export default App;
