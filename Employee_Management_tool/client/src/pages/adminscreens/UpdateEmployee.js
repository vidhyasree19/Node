import React, { useState } from 'react';
import axios from 'axios';
import './UpdateEmployee.css'

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    team: '',
    role: '',
    manager: '',
    projects: [],
    performanceScore: 0,
  });

  const [newProject, setNewProject] = useState('');
  const [newPerformanceScore, setNewPerformanceScore] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/employees/${employee._id}`, employee);
      console.log(response.data);
      if (newProject) {
        await axios.post(`http://localhost:4000/api/employees/${employee._id}/projects`, { project: newProject });
        setEmployee({...employee, projects: [...employee.projects, newProject] });
        setNewProject('');
      }
      if (newPerformanceScore) {
        await axios.patch(`http://localhost:4000/api/employees/${employee._id}/performance`, { performanceScore: newPerformanceScore });
        setEmployee({...employee, performanceScore: newPerformanceScore });
        setNewPerformanceScore(0);
      }
  
      setEmployee({
       ...employee,
        projects: employee.projects.concat(newProject),
        performanceScore: newPerformanceScore,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='UpdateEmployee'>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
        </label>
        <br />
        <label>
          Department:
          <input type="text" value={employee.department} onChange={(e) => setEmployee({ ...employee, department: e.target.value })} />
        </label>
        <br />
        <label>
          Team:
          <input type="text" value={employee.team} onChange={(e) => setEmployee({ ...employee, team: e.target.value })} />
        </label>
        <br />
        <label>
          Role:
          <input type="text" value={employee.role} onChange={(e) => setEmployee({ ...employee, role: e.target.value })} />
        </label>
        <br />
        <label>
          Manager:
          <input type="text" value={employee.manager} onChange={(e) => setEmployee({ ...employee, manager: e.target.value })} />
        </label>
        <br />
        <h2>Allocate Project</h2>
        <label>
          Project:
          <input type="text" value={newProject} onChange={(e) => setNewProject(e.target.value)} />
        </label>
        <br />
        <h2>Update Performance Score</h2>
        <label>
          Performance Score:
          <input type="number" value={newPerformanceScore} onChange={(e) => setNewPerformanceScore(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;