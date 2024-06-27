import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
  
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const url = `/api/user/${username}`;
        console.log(`Making request to ${url}`);
        axios.get(url)
          .then(response => {
            console.log('Response:', response.data);
            setRole(response.data.role);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }, [username]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    console.log('Role:', role);
  
    if (role === 'employee') {
      return <EmployeeDashboard />;
    } else if (role === 'admin') {
      return <AdminDashboard />;
    } else {
      return <div>Unauthorized access</div>;
    }
  };
export default Dashboard;