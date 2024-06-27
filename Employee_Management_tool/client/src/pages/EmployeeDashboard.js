import React from 'react';
import {Routes,Route, Link } from 'react-router-dom';
// import EmployeeProfile from './EmployeeProfile';
// import ViewTeamDetails from './ViewTeamDetails';
// import RaiseComplaint from './RaiseComplaint';
// import ViewComplaints from './ViewComplaints';
import './EmployeeDashboard.css'


const EmployeeDashboard = () => {
  return (
    <div className='EmployeeDashboard'>
      <h1>Employee Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/employee/profile">View Profile</Link>
          </li>
          <li>
            <Link to="/employee/team">View Team Details</Link>
          </li>
          <li>
            <Link to="/employee/complaints/raise">Raise a Complaint</Link>
          </li>
          <li>
            <Link to="/employee/complaints/all">View All Complaints</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        
      </Routes>
    </div>
  );
};

export default EmployeeDashboard;