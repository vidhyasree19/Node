import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeProfile.css'
const EmployeeProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('/employee/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='EmployeeProfile'>
      <h2>Employee Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Department: {profile.department}</p>
    </div>
  );
};

export default EmployeeProfile;