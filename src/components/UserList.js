import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users, onDelete }) {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p><strong>{user.name}</strong> - {user.email}</p>
            <p>Phone: {user.phone}</p>
            <Link to={`/user/${user.id}`}>View Details</Link>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
