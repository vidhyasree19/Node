import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css'
const AddEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [team, setTeam] = useState('');
    const [role, setRole] = useState('');
    const [manager, setManager] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee = {
            name,
            email,
            department,
            team,
            role,
            manager
        };
        try {
            const response = await axios.post('http://localhost:4000/api/employees', employee);
            // const usersbyAdmin = await axios.post("http://localhost:4000/api/users",{email:email,password:"123456"});
            // console.log(usersbyAdmin)
            console.log(response.data);
            alert('Employee added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding employee!');
        }
    };
    return (
        <div className='AddEmployee'>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <br />
                <label>
                    Department:
                    <input type="text" value={department} onChange={(event) => setDepartment(event.target.value)} />
                </label>
                <br />
                <label>
                    Team:
                    <input type="text" value={team} onChange={(event) => setTeam(event.target.value)} />
                </label>
                <br />
                <label>
                    Role:
                    <input type="text" value={role} onChange={(event) => setRole(event.target.value)} />
                </label>
                <br />
                <label>
                    Manager:
                    <input type="text" value={manager} onChange={(event) => setManager(event.target.value)} />
                </label>
                <br />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;