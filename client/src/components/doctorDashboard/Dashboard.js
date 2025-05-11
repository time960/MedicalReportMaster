import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChiefComplaintsChart from './ChiefComplaintsChart';
import MedicinesChart from './MedicinesChart';
import InvestigationsChart from './InvestigationsChart';
import AdvicesChart from './AdvicesChart';

const DoctorDashboard = () => {
  const [data, setData] = useState([]);
  const apiUrl = "https://medical-record-rxyo.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getdoctor`, {
          withCredentials: true,
          credentials: "include",
          crossDomain: true,
        });
        if (response.data && response.data.doctor && response.data.doctor.prescriptions) {
          setData(response.data.doctor.prescriptions);
        }
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []); 

  if (data.length === 0) {
    return <div> Start diagnosis of patients for more insights</div>;
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2vh',
    height: '100vh',
    overflowY: 'auto',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  };

  const chartContainerStyle = {
    width: '600px',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Doctor's Prescriptions Dashboard</h1>
      <div style={rowStyle}>
        <div style={chartContainerStyle}>
          <ChiefComplaintsChart data={data} />
        </div>
        <div style={chartContainerStyle}>
          <MedicinesChart data={data} />
        </div>
        <div style={chartContainerStyle}>
          <InvestigationsChart data={data} />
        </div>
        <div style={chartContainerStyle}>
          <AdvicesChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
