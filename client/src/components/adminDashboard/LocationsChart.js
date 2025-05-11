import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
  } from 'chart.js';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement
  );
const LocationsChart = ({ data }) => {
  const locations = {};
  data.forEach(record => {
    locations[record._id.city] = (locations[record._id.city] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(locations),
    datasets: [{
      label: 'Locations of Visits',
      data: Object.values(locations),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }],
  };

  return <Doughnut data={chartData} />;
};

export default LocationsChart;
