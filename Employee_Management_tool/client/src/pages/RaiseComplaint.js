import React, { useState } from 'react';
import axios from 'axios';
import './RaiseComplaint.css';
const RaiseComplaint = () => {
    const [complaint, setComplaint] = useState({
      title: '',
      description: ''
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:4000/employee/complaints', complaint)
       .then(response => {
          console.log(response.data);
        })
       .catch(error => {
          console.error(error);
        });
    };
  
    return (
      <div className='RaiseComplaint'>
        <h2>Raise a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={complaint.title} onChange={(event) => setComplaint({...complaint, title: event.target.value })} />
          <br />
          <label>Description:</label>
          <textarea value={complaint.description} onChange={(event) => setComplaint({...complaint, description: event.target.value })} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default RaiseComplaint;