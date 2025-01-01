'use client';

import { useState, useEffect } from 'react';

export function useShareUrl(path: string) {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    // Only access window.location after component is mounted
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setUrl(`${baseUrl}${path}`);
    }
  }, [path]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  };

  const shareViaEmail = () => {
    if (typeof window !== 'undefined') {
      const subject = 'Please fill out this form';
      const body = `I've shared a form with you: ${url}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return {
    url,
    copyToClipboard,
    shareViaEmail
  };
}