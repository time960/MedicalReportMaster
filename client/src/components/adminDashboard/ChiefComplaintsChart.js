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
const ChiefComplaintsChart = ({ data }) => {
  const complaints = {};
  data.forEach(record => {
    record.chiefComplaints.flat().forEach(complaint => {
      complaints[complaint.complaint] = (complaints[complaint.complaint] || 0) + 1;
    });
  });
 console.log("complaints",complaints);
  const chartData = {
    labels: Object.keys(complaints),
    datasets: [{
      label: 'Frequency of Chief Complaints',
      data: Object.values(complaints),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default ChiefComplaintsChart;
