
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Complaints.css';
const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/employee/complaints/all')
            .then(response => {
                setComplaints(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='AdminComplaintsPage'>
            <h2>Complaints</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {complaints.map(complaint => (
                    <li key={complaint._id}>
                        <h3>{complaint.title}</h3>
                        <p>{complaint.description}</p>
                        <p>Status: {complaint.status}</p>
                        <p>Raised by: {complaint.raisedBy? complaint.raisedBy.name : 'Unknown'}</p>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Complaints;