'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieProps {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
}

export function Pie({ data, options }: PieProps) {
  return <PieChart data={data} options={options} />;
}