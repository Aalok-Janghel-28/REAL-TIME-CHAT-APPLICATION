import '../styles/UserList.css';

export default function UserList({ users, currentUsername }) {
  return (
    <div className="user-list">
      <h3>Users in Chat ({users.length})</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className={user.username === currentUsername ? 'current-user' : ''}>
            <span className="user-indicator">●</span>
            {user.username}
            {user.username === currentUsername && <span className="you"> (You)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
