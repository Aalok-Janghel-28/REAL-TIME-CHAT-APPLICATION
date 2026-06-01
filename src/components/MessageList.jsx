import MessageItem from './MessageItem';
import '../styles/MessageList.css';

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} />
      ))}
    </div>
  );
}
