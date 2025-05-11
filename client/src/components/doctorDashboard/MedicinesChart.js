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
const MedicinesChart = ({ data }) => {
  const medicines = {};
  data.forEach(prescription => {
    prescription.medicines.forEach(medicine => {
      medicines[medicine.medicineName] = (medicines[medicine.medicineName] || 0) + 1;
    });
  });

  const chartData = {
    labels: Object.keys(medicines),
    datasets: [{
      label: 'Frequency of Medicines Prescribed',
      data: Object.values(medicines),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default MedicinesChart;
