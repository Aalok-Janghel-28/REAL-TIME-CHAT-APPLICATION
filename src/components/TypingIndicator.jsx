import '../styles/TypingIndicator.css';

export default function TypingIndicator({ typingUsers }) {
  if (typingUsers.length === 0) return null;

  const typingText = typingUsers.length === 1
    ? `${typingUsers[0]} is typing...`
    : `${typingUsers.join(', ')} are typing...`;

  return (
    <div className="typing-indicator">
      <span>{typingText}</span>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
