import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import JoinForm from './components/JoinForm';
import ChatContainer from './components/ChatContainer';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');

  // CHANGE THIS TO YOUR COMPUTER'S IP ADDRESS FOR MULTI-DEVICE SUPPORT
  // Find your IP: Windows (ipconfig) or Mac/Linux (ifconfig)
  // Example: '192.168.0.100' for local network, or 'localhost' for same computer only
  const SERVER_URL = 'http://localhost:3001'; // Change 'localhost' to your IP for multi-device

  useEffect(() => {
    // Create socket connection with better options
    const newSocket = io(SERVER_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
      setError('');
      setSocket(newSocket);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
      setError(`Cannot connect to server at ${SERVER_URL}. Make sure server is running.`);
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoin = ({ username: user, roomName: room }) => {
    if (socket && isConnected) {
      setUsername(user);
      setRoomName(room);
      socket.emit('join-room', {
        username: user,
        roomName: room
      });
    } else {
      setError('Not connected to server yet. Please wait...');
    }
  };

  const handleLeave = () => {
    setUsername('');
    setRoomName('');
  };

  if (!isConnected) {
    return (
      <div className="app">
        <div className="loading">
          <h1>🔗 Connecting to Chat Server...</h1>
          <p>Server: {SERVER_URL}</p>
          {error && <p style={{ color: '#ff6b6b', marginTop: '20px', fontSize: '14px' }}>{error}</p>}
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.8 }}>
            Run in terminal: <br />
            <code style={{ background: '#333', padding: '10px', borderRadius: '5px', display: 'inline-block', marginTop: '10px' }}>
              cd server && npm start
            </code>
          </p>
        </div>
      </div>
    );
  }

  if (!username || !roomName) {
    return (
      <div className="app">
        <JoinForm onJoin={handleJoin} />
      </div>
    );
  }

  return (
    <div className="app">
      <ChatContainer
        socket={socket}
        username={username}
        roomName={roomName}
        onLeave={handleLeave}
      />
    </div>
  );
}

export default App;
