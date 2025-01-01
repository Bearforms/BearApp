'use client';

export function convertTo12Hour(hour24: number): { hour12: number; period: 'AM' | 'PM' } {
  if (hour24 === 0) return { hour12: 12, period: 'AM' };
  if (hour24 === 12) return { hour12: 12, period: 'PM' };
  
  return {
    hour12: hour24 > 12 ? hour24 - 12 : hour24,
    period: hour24 >= 12 ? 'PM' : 'AM'
  };
}

export function convertTo24Hour(hour12: number, period: 'AM' | 'PM'): number {
  if (hour12 === 12) {
    return period === 'AM' ? 0 : 12;
  }
  return period === 'AM' ? hour12 : hour12 + 12;
}

export function formatTime(hour: string, minute: string, period: string): string {
  const h = hour.padStart(2, '0');
  const m = minute.padStart(2, '0');
  return `${h}:${m} ${period}`;
}