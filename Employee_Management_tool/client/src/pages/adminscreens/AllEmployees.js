import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllEmployees.css'
const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className='AllEmployees'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>All Employees</h1>
          <ul>
            {employees.map((employee) => (
              <li key={employee._id}>
                {employee.name} ({employee.email})
                <p>Department: {employee.department}</p>
                <p>Team: {employee.team}</p>
                <p>Role: {employee.role}</p>
                <p>Manager: {employee.manager}</p>
              </li>
            ))}
          </ul>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AllEmployees;