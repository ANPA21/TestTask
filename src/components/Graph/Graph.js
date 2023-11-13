import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Graph = ({ graphData }) => {
  const labels = graphData
    .slice()
    .reverse()
    .map((item, index) => (item.day ? item.day : `Day ${index - 1}`));
  const graphDatasets = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: graphData
          .slice()
          .reverse()
          .map(item => item.totalCases),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Deaths',
        data: graphData
          .slice()
          .reverse()
          .map(item => item.totalDeaths),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    xAxisID: 'Period',
    yAxisID: 'Cases',
    tension: '0.3',
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cases',
        position: 'left',
      },

      scales: {
        x: {
          type: 'linear',
          display: true,
          text: 'Cases',
          position: 'left',
        },
        y: {
          type: 'linear',
          display: true,
          text: 'Period',
          position: 'center',
        },
      },
    },
  };

  return (
    <div style={{ width: `1000px`, height: `1000px` }}>
      <Line data={graphDatasets} options={options} />
    </div>
  );
};
