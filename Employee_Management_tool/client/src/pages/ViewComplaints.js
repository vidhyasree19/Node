import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredComplaints = complaints.filter((complaint) => {
    return (
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='AdminComplaintsPage'>
      <h2>Complaints</h2>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by title, description, or status" />
      {loading? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map(complaint => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.status}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Complaints;