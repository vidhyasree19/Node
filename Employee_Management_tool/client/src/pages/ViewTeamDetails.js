import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTeamDetails.css'
const ViewTeamDetails = () => {
  const [team, setTeam] = useState({});

  useEffect(() => {
    axios.get('/employee/team')
      .then(response => {
        setTeam(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='ViewTeamDetails'>
      <h2>Team Details</h2>
      <p>Team Name: {team.name}</p>
      <p>Team Lead: {team.lead}</p>
    </div>
  );
};

export default ViewTeamDetails;