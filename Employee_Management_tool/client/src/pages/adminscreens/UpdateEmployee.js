import React, { useState, useEffect } from 'react';
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
  const [emailExists, setEmailExists] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkEmailExists = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employees/email/${employee.email}`);
        if (response.data) {
          setEmailExists(true);
        } else {
          setEmailExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkEmailExists();
  }, [employee.email]);

  const handleEmailChange = (e) => {
    setEmployee({ ...employee, email: e.target.value });
    setEmailExists(false);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name should contain only alphabets.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
    setEmployee({ ...employee, name: value });
  };

  const handleDepartmentChange = (e) => {
    setEmployee({ ...employee, department: e.target.value });
  };

  const handleTeamChange = (e) => {
    setEmployee({ ...employee, team: e.target.value });
  };

  const handleRoleChange = (e) => {
    setEmployee({ ...employee, role: e.target.value });
  };

  const handleManagerChange = (e) => {
    setEmployee({ ...employee, manager: e.target.value });
  };

  const handleNewProjectChange = (e) => {
    setNewProject(e.target.value);
  };

  const handleNewPerformanceScoreChange = (e) => {
    setNewPerformanceScore(e.target.valueAsNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailExists) {
      alert('Email not found in employee schema');
      return;
    }
    try {
      const updatedEmployee = {
        ...employee,
        name: employee.name,
        department: employee.department,
        team: employee.team,
        role: employee.role,
        manager: employee.manager,
        performanceScore: employee.performanceScore,
      };
      if (newProject) {
        if (Array.isArray(employee.projects)) {
          updatedEmployee.projects = [...employee.projects, newProject];
        } else {
          updatedEmployee.projects = [newProject];
        }
      } else {
        updatedEmployee.projects = employee.projects;
      }
      if (newPerformanceScore) {
        updatedEmployee.performanceScore = newPerformanceScore;
      }
      const updateResponse = await axios.put(`http://localhost:4000/api/employees/${employee.email}`, updatedEmployee);
      console.log(updateResponse.data);
      alert('Employee updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating employee');
    }
  };

  return (
    <div className='UpdateEmployee'>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={employee.name} onChange={handleNameChange} />
        </label>
        {errors.name && <p className='error'>{errors.name}</p>}
        <br />
        <label>
          Email:
          <input type="email" value={employee.email} onChange={handleEmailChange} />
        </label>
        {errors.email && <p className='error'>{errors.email}</p>}
        <br />
        <label>
          Department:
          <select value={employee.department} onChange={handleDepartmentChange}>
            <option value="">Select department</option>
            <option value="software-engineering">Software Engineering</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
          </select>
        </label>
        <br />
        <label>
          Team:
          <input type="text" value={employee.team} onChange={handleTeamChange} />
        </label>
        {errors.team && <p className='error'>{errors.team}</p>}
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