import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const InvestigationsChart = ({ data }) => {
  const investigations = {};
  data.forEach(prescription => {
    prescription.investigations.forEach(investigation => {
      investigations[investigation.investigation] = (investigations[investigation.investigation] || 0) + 1;
    });
  });

  const chartData = {
    labels: Object.keys(investigations),
    datasets: [{
      label: 'Frequency of Investigations Ordered',
      data: Object.values(investigations),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default InvestigationsChart;
