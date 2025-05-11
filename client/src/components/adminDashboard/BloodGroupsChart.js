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
const BloodGroupsChart = ({ data }) => {
  const bloodGroups = {};
  data.forEach(record => {
    record.bloodGroups.forEach(bg => {
      bloodGroups[bg] = (bloodGroups[bg] || 0) + 1;
    });
  });

  const chartData = {
    labels: Object.keys(bloodGroups),
    datasets: [{
      label: 'Blood Group Distribution',
      data: Object.values(bloodGroups),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default BloodGroupsChart;
