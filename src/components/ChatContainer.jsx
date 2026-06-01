import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import InputField from './InputField';
import TypingIndicator from './TypingIndicator';
import UserList from './UserList';
import '../styles/ChatContainer.css';

export default function ChatContainer({ socket, username, roomName, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeoutsRef = useRef({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('user-joined', (data) => {
      setMessages((prev) => [...prev, { message: data.message }]);
    });

    socket.on('user-left', (data) => {
      setMessages((prev) => [...prev, { message: data.message }]);
    });

    socket.on('user-list', (users) => {
      setUsers(users);
    });

    socket.on('user-typing', (data) => {
      setTypingUsers((prev) => {
        if (!prev.includes(data.username)) {
          return [...prev, data.username];
        }
        return prev;
      });

      // Clear previous timeout for this user
      if (typingTimeoutsRef.current[data.username]) {
        clearTimeout(typingTimeoutsRef.current[data.username]);
      }

      // Set timeout to remove user from typing list
      typingTimeoutsRef.current[data.username] = setTimeout(() => {
        setTypingUsers((prev) =>
          prev.filter((user) => user !== data.username)
        );
        delete typingTimeoutsRef.current[data.username];
      }, 2000);
    });

    socket.on('user-stop-typing', (data) => {
      if (typingTimeoutsRef.current[data.username]) {
        clearTimeout(typingTimeoutsRef.current[data.username]);
      }
      setTypingUsers((prev) =>
        prev.filter((user) => user !== data.username)
      );
      delete typingTimeoutsRef.current[data.username];
    });

    const currentTimeouts = typingTimeoutsRef.current;

    return () => {
      socket.off('receive-message');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('user-list');
      socket.off('user-typing');
      socket.off('user-stop-typing');
      Object.values(currentTimeouts).forEach(clearTimeout);
    };
  }, [socket]);

  const handleSendMessage = (message) => {
    socket.emit('send-message', {
      roomName,
      message,
      username
    });
  };

  const handleTyping = (isTyping) => {
    if (isTyping) {
      socket.emit('typing', { roomName, username });
    } else {
      socket.emit('stop-typing', { roomName, username });
    }
  };

  const handleLeave = () => {
    socket.disconnect();
    onLeave();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h2>{roomName}</h2>
          <p className="user-info">Logged in as: {username}</p>
        </div>
        <button className="leave-btn" onClick={handleLeave}>
          Leave Chat
        </button>
      </div>

      <div className="chat-main">
        <div className="chat-area">
          <MessageList messages={messages} />
          <TypingIndicator typingUsers={typingUsers} />
          <div ref={messagesEndRef} />
        </div>
        <UserList users={users} currentUsername={username} />
      </div>

      <InputField onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
}
