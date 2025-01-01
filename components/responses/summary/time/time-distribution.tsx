'use client';

import { FormField } from '@/types/form';
import { Bar } from '@/components/ui/charts/bar';
import { ChartData, ChartOptions } from 'chart.js';
import { getTimeDistribution } from './time-utils';

interface TimeDistributionProps {
  field: FormField;
  responses: any[];
}

export function TimeDistribution({ field, responses }: TimeDistributionProps) {
  const distribution = getTimeDistribution(field, responses);

  const data: ChartData<'bar'> = {
    labels: Object.keys(distribution),
    datasets: [
      {
        label: 'Responses',
        data: Object.values(distribution),
        backgroundColor: 'hsl(var(--primary))',
        borderRadius: 4,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
}