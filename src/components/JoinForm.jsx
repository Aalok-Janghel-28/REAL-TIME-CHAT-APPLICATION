import { useState } from 'react';
import '../styles/JoinForm.css';

export default function JoinForm({ onJoin }) {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && roomName.trim()) {
      onJoin({ username, roomName });
    }
  };

  return (
    <div className="join-form-container">
      <div className="join-form">
        <h1>Real-Time Chat</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room Name:</label>
            <input
              id="room"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </div>
          <button type="submit">Join Chat</button>
        </form>
      </div>
    </div>
  );
}
