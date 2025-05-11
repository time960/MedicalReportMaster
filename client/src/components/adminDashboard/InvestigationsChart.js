import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
  } from 'chart.js';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
  );
const InvestigationsChart = ({ data }) => {
  const dates = [];
  const investigations = [];

  data.forEach(record => {
    dates.push(record._id.date);
    investigations.push(record.investigations.flat().length);
  });

  const chartData = {
    labels: dates,
    datasets: [{
      label: 'Number of Investigations',
      data: investigations,
      borderColor: 'rgba(75, 192, 192, 0.6)',
      fill: false,
    }],
  };

  return <Line data={chartData} />;
};

export default InvestigationsChart;
