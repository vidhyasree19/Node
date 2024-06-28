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
    const [projects, setProjects] = useState([]); 
    const [performanceScore, setPerformance] = useState(0); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target; 
        let error = ""; 
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) { 
               error = 'Name should contain only alphabets.';
            } 
        } 
        if (name === 'email') { 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailRegex.test(value)) {
                error = 'Enter a valid email address.'; 
            } 
        } 
        if (name === 'team' || name === 'role' || name === 'anager') {
            error = '';
        }
        
        setErrors((prevErrors) => ({...prevErrors, [name]: error, }));
        
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'team') setTeam(value);
        if (name === 'role') setRole(value);
        if (name === 'anager') setManager(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee = {
            name,
            email,
            department,
            team,
            role,
            manager,
            projects,
            performanceScore
        };
        try {
            const response = await axios.post('http://localhost:4000/api/employees', employee);
            const userData = {
                email: email,
                password: password 
            }
            try {
                const userResponse = await axios.post("http://localhost:4000/api/users", userData);
                console.log(userResponse.data);
            } catch (error) {
                console.error(error);
                alert('Error creating user!');
            }
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
                    <input type="text" value={name} onChange={handleChange} name="name" />
                </label>
                {errors.name && <p className='error'>{errors.name}</p>}
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleChange} name="email" />
                </label>
                {errors.email && <p className='error'>{errors.email}</p>}
                <br />
                <label>
                    Department:
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
                    <input type="text" value={team} onChange={handleChange} name="team" />
                </label>
                {errors.team && <p className='error'>{errors.team}</p>}
                <br />
                <label>
                    Role:
                    <input type="text" value={role} onChange={handleChange} name="role" />
                </label>
                {errors.role && <p className='error'>{errors.role}</p>}
                <br />
                <label>
                    Manager:
                    <input type="text" value={manager} onChange={(event) => setManager(event.target.value)} />
                </label>
                <br/>
                <label>
                    Project:
                    <input type="text" value={projects} onChange={(event) => setProjects([...projects, event.target.value])} />
                </label>
                <br />
                <label>
                    Performance:
                    <input type="number" value={performanceScore} onChange={(event) => setPerformance(event.target.valueAsNumber)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;