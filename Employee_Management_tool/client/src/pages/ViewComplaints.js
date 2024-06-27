import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewComplaints.css'

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://localhost:4000/employee/complaints/all')
        .then(response => {
          console.log('Response:', response);
          setComplaints(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className='ViewComplaints'>
        <h2>View Complaints</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {complaints.map(complaint => (
              <li key={complaint._id}>
                <h3>{complaint.title}</h3>
                <p>{complaint.description}</p>
                <p>Status: {complaint.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default ViewComplaints;