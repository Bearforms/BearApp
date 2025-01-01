'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getTimeOfDay, getFormattedDate } from '@/lib/date-utils';

interface WelcomeMessageProps {
  className?: string;
}

export function WelcomeMessage({ className }: WelcomeMessageProps) {
  const [username, setUsername] = useState('');
  const timeOfDay = getTimeOfDay();
  const today = getFormattedDate();

  useEffect(() => {
    // In a real app, this would come from auth/user context
    // For demo, using a placeholder name
    setUsername('John');
  }, []);

  if (!username) return null;

  return (
    <div className={cn('space-y-1', className)}>
      <h1 className="text-xl font-medium tracking-tight">
        Good {timeOfDay}, {username}
      </h1>
      <p className="text-sm text-muted-foreground">{today}</p>
    </div>
  );
}