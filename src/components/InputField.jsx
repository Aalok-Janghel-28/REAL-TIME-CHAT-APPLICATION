import { useState } from 'react';
import '../styles/InputField.css';

export default function InputField({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout for stop typing
    const timeout = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setIsTyping(false);
      onTyping(false);
      if (typingTimeout) clearTimeout(typingTimeout);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-field">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
