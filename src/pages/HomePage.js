import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api';
import UserList from '../components/UserList';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return <UserList users={users} onDelete={handleDelete} />;
}

export default HomePage;
