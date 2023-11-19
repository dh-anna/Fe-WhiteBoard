import React, { useState } from "react";

export const NewWhiteboard: React.FC = () => {
  const [whiteboardId, setWhiteboardId] = useState<number | null>(null);

  const handleNewWhiteboard = () => {
    const newId = Math.floor(Math.random() * 1000000);
    setWhiteboardId(newId);
  };

  return (
    <div>
      <button onClick={handleNewWhiteboard}>Create New Whiteboard</button>
    </div>
  );
};
