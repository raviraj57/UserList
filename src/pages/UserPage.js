import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateUser, fetchUsers } from '../api';
import UserForm from '../components/UserForm';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const users = await fetchUsers();
      const currentUser = users.find(u => u.id === parseInt(id));
      setUser(currentUser);
      setLoading(false);
    };
    loadUser();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      alert('User updated successfully!');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return <UserForm user={user} onSubmit={handleUpdate} />;
}

export default UserPage;
