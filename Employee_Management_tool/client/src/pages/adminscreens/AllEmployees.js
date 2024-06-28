import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllEmployees.css';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRemoveEmployee = async (employeeId) => {
    console.log(`Removing employee with ID: ${employeeId}`);
    try {
      const response = await axios.delete(`http://localhost:4000/api/employees/${employeeId}`);
      console.log(`Response from server: ${response.status}`);
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
      console.log(`Updated employees state: ${employees}`);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className='AllEmployees'>
      <h2><center>All Employees</center></h2>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by name, department" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='employee-grid'>
          {filteredEmployees.map((employee) => (
            <div key={employee._id} className='employee-card'>
              <h2>{employee.name}</h2>
              <p>Email: {employee.email}</p>
              <p>Department: {employee.department}</p>
              <p>Team: {employee.team}</p>
              <p>Role: {employee.role}</p>
              <p>Manager: {employee.manager}</p>
              {/* <button onClick={() => handleRemoveEmployee(employee._id)}>Remove</button> */}
            </div>
          ))}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AllEmployees;