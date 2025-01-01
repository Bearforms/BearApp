'use client';

import { FormField } from '@/types/form';
import { Bar } from '@/components/ui/charts/bar';
import { ChartData, ChartOptions } from 'chart.js';
import { getDateDistribution } from './date-utils';

interface DateDistributionProps {
  field: FormField;
  responses: any[];
}

export function DateDistribution({ field, responses }: DateDistributionProps) {
  const distribution = getDateDistribution(field, responses);

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