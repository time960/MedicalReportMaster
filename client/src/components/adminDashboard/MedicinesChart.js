import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  
 
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
  );
const MedicinesChart = ({ data }) => {
  const medicines = {};
  data.forEach(record => {
    record.medicines.flat().forEach(medicine => {
      medicines[medicine.medicineName] = (medicines[medicine.medicineName] || 0) + medicine.total;
    });
  });

  const chartData = {
    labels: Object.keys(medicines),
    datasets: [{
      label: 'Distribution of Medicines Prescribed',
      data: Object.values(medicines),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  };

  return <Pie data={chartData} />;
};

export default MedicinesChart;
