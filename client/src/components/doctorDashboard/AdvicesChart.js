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
const AdvicesChart = ({ data }) => {
  const advices = {};
  data.forEach(prescription => {
    prescription.advices.forEach(advice => {
      advices[advice.advice] = (advices[advice.advice] || 0) + 1;
    });
  });

  const chartData = {
    labels: Object.keys(advices),
    datasets: [{
      label: 'Frequency of Advices Given',
      data: Object.values(advices),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default AdvicesChart;
