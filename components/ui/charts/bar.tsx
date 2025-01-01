'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

export function Bar({ data, options }: BarProps) {
  return <BarChart data={data} options={options} />;
}