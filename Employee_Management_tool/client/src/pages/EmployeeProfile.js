import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      return;
    }
    axios.get(`/api/profile/${email}`)
     .then(response => {
        setUser(response.data);
        setLoading(false);
      })
     .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Department: {user.department}</p>
      <p>Team: {user.team}</p>
      <p>Role: {user.role}</p>
      <p>Manager: {user.manager}</p>
      <p>Projects: {user.projects.join(', ')}</p>
      <p>Performance Score: {user.performanceScore}</p>
    </div>
  );
};

export default ViewProfile;