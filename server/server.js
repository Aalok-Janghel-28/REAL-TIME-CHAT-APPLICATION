import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());

// Add a simple health check endpoint
app.get('/', (req, res) => {
  res.send('Chat Server is running');
});

// Store active users in rooms
const rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining a room
  socket.on('join-room', (data) => {
    const { username, roomName } = data;

    // Leave previous room if any
    const previousRoom = Object.keys(socket.rooms).find(room => room !== socket.id);
    if (previousRoom) {
      socket.leave(previousRoom);
      if (!rooms[previousRoom]) rooms[previousRoom] = {};
      delete rooms[previousRoom][socket.id];
      io.to(previousRoom).emit('user-list', Object.values(rooms[previousRoom] || {}));
    }

    // Join new room
    socket.join(roomName);
    if (!rooms[roomName]) rooms[roomName] = {};
    rooms[roomName][socket.id] = { id: socket.id, username };

    console.log(`${username} joined ${roomName}`);

    // Notify all users in the room
    io.to(roomName).emit('user-joined', {
      username,
      message: `${username} joined the chat`
    });

    // Send updated user list
    io.to(roomName).emit('user-list', Object.values(rooms[roomName]));
  });

  // Handle incoming messages
  socket.on('send-message', (data) => {
    const { roomName, message, username } = data;
    const timestamp = new Date().toLocaleTimeString();

    io.to(roomName).emit('receive-message', {
      id: socket.id,
      username,
      message,
      timestamp
    });

    console.log(`Message in ${roomName} from ${username}: ${message}`);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const { roomName, username } = data;
    socket.to(roomName).emit('user-typing', { username });
  });

  // Handle stop typing
  socket.on('stop-typing', (data) => {
    const { roomName, username } = data;
    socket.to(roomName).emit('user-stop-typing', { username });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    // Find and remove user from all rooms
    Object.keys(rooms).forEach(roomName => {
      if (rooms[roomName][socket.id]) {
        const username = rooms[roomName][socket.id].username;
        delete rooms[roomName][socket.id];

        io.to(roomName).emit('user-left', {
          username,
          message: `${username} left the chat`
        });

        io.to(roomName).emit('user-list', Object.values(rooms[roomName] || {}));
      }
    });
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
