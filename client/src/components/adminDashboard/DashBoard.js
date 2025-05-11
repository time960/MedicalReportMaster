import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChiefComplaintsChart from './ChiefComplaintsChart';
import MedicinesChart from './MedicinesChart';
import InvestigationsChart from './InvestigationsChart';
import LocationsChart from './LocationsChart';
import BloodGroupsChart from './BloodGroupsChart';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://medical-record-rxyo.onrender.com/getdetails', { withCredentials: true })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    // overflowY: 'auto',
  };

  const chartContainerStyle = {
    width: '500px',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Medical Records Dashboard</h1>
      <div style={rowStyle}>
        <div style={chartContainerStyle}>
          <ChiefComplaintsChart data={data} />
        </div>
        <div style={chartContainerStyle}>
          <MedicinesChart data={data} />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={chartContainerStyle}>
          <InvestigationsChart data={data} />
        </div>
        <div style={chartContainerStyle}>
          <LocationsChart data={data} />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={chartContainerStyle}>
          <BloodGroupsChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
