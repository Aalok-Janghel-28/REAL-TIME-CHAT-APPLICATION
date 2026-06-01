# Quick Start Guide - Real-Time Chat App

## 🚀 Start the Application

### Option 1: Windows (Easiest)
```
Double-click: start.bat
```
This opens two terminals automatically:
- Server on http://localhost:3001
- Client on http://localhost:5173

### Option 2: Manual Start
**Terminal 1 (Server):**
```bash
cd server
npm start
```

**Terminal 2 (Client):**
```bash
npm run dev
```

## 📖 How to Use

1. **Open Browser:** http://localhost:5173
2. **Enter Username:** Any name you want
3. **Enter Room Name:** Same name to join existing room or new name to create
4. **Click "Join Chat"**
5. **Start typing and chatting!**

## 🔄 Test with Multiple Users

1. Open first user: Username "Alice", Room "general"
2. Open another tab/window: Username "Bob", Room "general"
3. Both users see each other's messages instantly
4. See typing indicators when either user types

## 📱 Features to Try

- **Send Message:** Type in input field and press Enter or click Send
- **Typing Indicator:** Start typing and see "User is typing..."
- **User List:** See all active users in the right sidebar
- **Join/Leave:** See notifications when users join or leave
- **Different Rooms:** Create separate rooms by using different room names
- **Timestamps:** Each message shows exactly when it was sent

## 🛠️ Troubleshooting

**Issue:** "Cannot connect to localhost:3001"
```
Fix: Make sure Terminal 1 shows "Chat server running on http://localhost:3001"
```

**Issue:** Port 5173 already in use
```
Fix: Check the Terminal 2 output - it will use next available port (usually 5174)
     Browser will open to correct port automatically
```

**Issue:** Messages not sending
```
Fix: Verify both users are in the same room name (case-sensitive)
     Check browser console for errors (F12)
```

## 📂 Project Files

```
Client Code:
- src/App.jsx - Main app, connects to Socket.io
- src/components/ - 7 UI components
- src/styles/ - CSS for each component

Server Code:
- server/server.js - Express + Socket.io backend
- server/package.json - Node dependencies

Configuration:
- package.json - Frontend dependencies
- vite.config.js - Build configuration
- eslint.config.js - Code linting rules
```

## 🔗 Key Socket.io Events

**From Client to Server:**
- `join-room` {username, roomName}
- `send-message` {roomName, message, username}
- `typing` {roomName, username}
- `stop-typing` {roomName, username}

**From Server to Client:**
- `receive-message` {id, username, message, timestamp}
- `user-joined` {username, message}
- `user-left` {username, message}
- `user-list` [users]
- `user-typing` {username}
- `user-stop-typing` {username}

## 🎨 Customize

**Change Server Port:**
Edit `server/server.js` line 77:
```javascript
const PORT = 3001; // Change to any port
```

**Change UI Colors:**
Edit `src/styles/ChatContainer.css` and change gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📊 Architecture

```
User Interface (React Components)
         ↓
   Socket.io Client
         ↓
   Real-time Network
         ↓
   Socket.io Server (Node.js)
         ↓
   Room Management & Broadcasting
         ↓
   Back to Socket.io Client
         ↓
   State Update & Re-render
```

## ⚡ Performance Tips

- Messages are sent instantly via Socket.io (< 50ms typically)
- Typing indicators update in real-time
- User list updates immediately on join/leave
- App supports unlimited concurrent users
- No database = instant startup (no persistence)

## 📞 Getting Help

**Check Browser Console:**
```
Press F12 → Console tab
Look for Socket.io connection messages
```

**Check Server Terminal:**
```
Watch for logs like:
- "User connected: ..."
- "User joined: ..."
- "Message sent: ..."
```

## 🎉 You're All Set!

The chat app is fully functional and ready to use. Enjoy real-time chatting!

For more information, see: README.md
