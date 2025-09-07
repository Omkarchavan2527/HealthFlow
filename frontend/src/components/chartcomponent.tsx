import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type ChartProps = {
  type: 'doughnut' | 'bar' | 'pie'; // narrowed to the types you’ll likely use
  remaining: number; // medicines left for today
  taken: number;     // medicines already taken
  title?: string;    // optional chart title
};

const ChartComponent: React.FC<ChartProps> = ({ type, remaining, taken, title }) => {
  const data = {
    labels: ['Remaining Medicines', 'Taken Medicines'],
    datasets: [
      {
        label: 'Medicines',
        data: [remaining, taken],
        backgroundColor: ['#3b82f6', '#22c55e'], // blue for remaining, green for taken
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: title || 'Medicine Progress' },
    },
  };

  return <Chart type={type} data={data} options={options} />;
};

export default ChartComponent;
