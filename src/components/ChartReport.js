import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: [ 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
      ],
    },
  ],
};

const ChartReport = () => (
  <>
    <Doughnut data={data} />
  </>
);

export default ChartReport;