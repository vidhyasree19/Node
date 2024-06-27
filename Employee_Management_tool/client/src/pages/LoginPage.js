
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login form");
      const response = await axios.post('http://localhost:4000/login', { email, password });
      console.log("Login successful");
      const {token} = response.data;
      const {role} = response.data;
      localStorage.setItem('token', token);
      console.log("Navigating to dashboard");
      if(role=="admin"){

        navigate('/Admindashboard');
      }
      else if(role=="employee"){

        navigate('/Employeedashboard');
      }
      else{

        navigate('/Dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;