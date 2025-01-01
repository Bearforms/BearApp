'use client';

import { FormField } from '@/types/form';
import { Bar } from '@/components/ui/charts/bar';
import { ChartData, ChartOptions } from 'chart.js';

interface RatingChartProps {
  field: FormField;
  responses: any[];
  className?: string;
}

export function RatingChart({ field, responses, className }: RatingChartProps) {
  const maxRating = field.type === 'star-rating' 
    ? field.settings?.maxStars || 5 
    : field.settings?.maxRating || 10;

  // Calculate rating distribution
  const distribution = Array.from({ length: maxRating }, (_, i) => ({
    rating: i + 1,
    count: responses.filter(r => Number(r.data[field.label]) === i + 1).length
  }));

  const data: ChartData<'bar'> = {
    labels: distribution.map(d => field.type === 'star-rating' ? `${d.rating} ★` : d.rating.toString()),
    datasets: [
      {
        label: 'Responses',
        data: distribution.map(d => d.count),
        backgroundColor: 'hsl(var(--primary))',
        borderRadius: 4,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Make it a horizontal bar chart
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
    <div className={className}>
      <Bar data={data} options={options} />
    </div>
  );
}