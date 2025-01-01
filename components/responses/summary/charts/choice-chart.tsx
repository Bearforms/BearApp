'use client';

import { FormField } from '@/types/form';
import { Bar } from '@/components/ui/charts/bar';
import { ChartData, ChartOptions } from 'chart.js';

interface ChoiceChartProps {
  field: FormField;
  responses: any[];
  className?: string;
}

export function ChoiceChart({ field, responses, className }: ChoiceChartProps) {
  // Calculate choice distribution
  let distribution: Record<string, number> = {};

  if (field.type === 'checkbox') {
    // For checkbox fields, count Yes/No responses
    distribution = {
      'Yes': responses.filter(r => r.data[field.label] === true).length,
      'No': responses.filter(r => r.data[field.label] === false).length
    };
  } else {
    // For other choice fields (select, multi-select, dropdown)
    distribution = field.options?.reduce((acc, option) => {
      let count = 0;
      
      if (field.type === 'multi-select') {
        // For multi-select, count how many times each option was selected
        count = responses.filter(r => 
          Array.isArray(r.data[field.label]) && 
          r.data[field.label].includes(option.value)
        ).length;
      } else {
        // For single select and dropdown
        count = responses.filter(r => r.data[field.label] === option.value).length;
      }
      
      acc[option.label] = count;
      return acc;
    }, {} as Record<string, number>) || {};
  }

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
    <div className={className}>
      <Bar data={data} options={options} />
    </div>
  );
}