import '../styles/MessageItem.css';

export default function MessageItem({ message }) {
  const isSystemMessage = !message.id;

  if (isSystemMessage) {
    return (
      <div className="message system-message">
        <p>{message.message}</p>
      </div>
    );
  }

  return (
    <div className="message">
      <div className="message-header">
        <span className="username">{message.username}</span>
        <span className="timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.message}</div>
    </div>
  );
}
