'use client';

import { FormField } from '@/types/form';

export function getTimeDistribution(field: FormField, responses: any[]): Record<string, number> {
  const timeSlots = {
    'Early Morning (12 AM - 6 AM)': 0,
    'Morning (6 AM - 12 PM)': 0,
    'Afternoon (12 PM - 5 PM)': 0,
    'Evening (5 PM - 9 PM)': 0,
    'Night (9 PM - 12 AM)': 0
  };

  responses.forEach(response => {
    const value = response.data[field.label];
    if (!value) return;

    try {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      // Categorize into time slots
      if (hour24 >= 0 && hour24 < 6) {
        timeSlots['Early Morning (12 AM - 6 AM)']++;
      } else if (hour24 >= 6 && hour24 < 12) {
        timeSlots['Morning (6 AM - 12 PM)']++;
      } else if (hour24 >= 12 && hour24 < 17) {
        timeSlots['Afternoon (12 PM - 5 PM)']++;
      } else if (hour24 >= 17 && hour24 < 21) {
        timeSlots['Evening (5 PM - 9 PM)']++;
      } else {
        timeSlots['Night (9 PM - 12 AM)']++;
      }
    } catch (error) {
      console.error('Error parsing time:', error);
    }
  });

  return timeSlots;
}