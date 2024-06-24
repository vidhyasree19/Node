import React, { useState } from 'react';
import './Registration.css'
import axios from 'axios';
const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [errors, setErrors] = useState("");
    const handleChange = (e) => {
         const { name, value } = e.target; 
         let error = ""; 
         if (name === 'firstName' || name === 'lastName') {
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
            if (name === 'mobileNumber') {
                    if (!/^\d{10}$/.test(value)) { 
                        error = 'Enter a valid 10-digit mobile number.'; 
                    } 
                } 
                setErrors((prevErrors) => ({ ...prevErrors, [name]: error, })); 
                if (name === 'firstName') setFirstName(value);
                if (name === 'lastName') setLastName(value); 
                if (name === 'email') setEmail(value);
                if (name === 'mobileNumber') setMobileNumber(value); 
            };

    const handlesubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
         if (!firstName) newErrors.firstName = "Please Enter FirstName"; 
         if (!lastName) newErrors.lastName= "Please Enter LastName"; 
         if (!email) newErrors.email = "Please Enter Email"; 
         if (!mobileNumber) newErrors.mobileNumber = "Please Enter Mobile Number"; setErrors(newErrors);
         if (Object.keys(newErrors).length === 0) { 
            axios.post('http://localhost:3002/register', { firstName, lastName, email, mobileNumber }) 
            .then(result =>console.log(result)) 
            .catch(err => console.log(err)); 
        } else { 
            console.log('Fix the errors before submitting');
        } 
        return ;
    };
    


       
    return (
        <div className='registrationForm'>
            <h2>Register Here</h2>
            <form onSubmit={handlesubmit}>
                <label>First Name:</label><br />
                <input type="text" name="firstName" placeholder='Enter first name' value={firstName} onChange={handleChange}  /><br />                 {errors.firstName && <p className='error'>{errors.firstName}</p>}
                <label>Last Name:</label><br />
                <input type="text" name="lastName" placeholder='Enter last name' value={lastName} onChange={handleChange} /><br />
                {errors.lastName && <p className='error'>{errors.lastName}</p>}
                <label>Email:</label><br />
                <input type="email" name="email" placeholder='Enter email' value={email} onChange={handleChange} /><br />
                {errors.email && <p className='error'>{errors.email}</p>}
                <label>Mobile Number:</label><br />
                <input type="text" name="mobileNumber" placeholder='Enter Phone number' value={mobileNumber} onChange={handleChange} /><br />
                {errors.mobileNumber && <p className='error'>{errors.mobileNumber}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Registration;
