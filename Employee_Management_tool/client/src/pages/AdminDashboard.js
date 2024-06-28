import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admindashboard.css'

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    axios.get('/api/employees')
     .then(response => {
        setEmployees(response.data);
      })
     .catch(error => {
        console.error(error);
      });

    axios.get('/api/projects')
     .then(response => {
        setProjects(response.data);
      })
     .catch(error => {
        console.error(error);
      });

    axios.get('/api/complaints')
     .then(response => {
        setComplaints(response.data);
      })
     .catch(error => {
        console.error(error);
      });

    axios.get('/api/performances')
     .then(response => {
        setPerformances(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='AdminDashboard'>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/allemployees">Employees </Link>
        </li>
        <li>
          <Link to="/addEmployee">Add Employees </Link>

        </li>
        <li>
          <Link to="/updateEmployees">Update Employees</Link>
        </li>
        <li>
          <Link to="/complaints">Complaints</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default AdminDashboard;