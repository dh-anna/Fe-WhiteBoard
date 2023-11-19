import React from 'react';
import logo from './logo.svg';
import './App.css';
import Whiteboard from "./components/whiteboard";

function App() {
  return (
      <div>
        <h1>Whiteboard App</h1>
        <Whiteboard width={800} height={600} />
      </div>
  );
}

export default App;
