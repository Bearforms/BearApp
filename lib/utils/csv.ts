'use client';

import { format } from 'date-fns';

export function convertToCSV(data: any[], fields: any[]) {
  try {
    // Create headers from field labels
    const headers = ['Submitted At', ...fields.map(field => field.label)];
    
    // Convert data to CSV rows
    const rows = data.map(response => {
      const row = [
        format(new Date(response.submittedAt), 'yyyy-MM-dd HH:mm:ss')
      ];
      
      // Add data for each field
      fields.forEach(field => {
        const value = response.data[field.label];
        
        // Handle different value types
        if (Array.isArray(value)) {
          row.push(value.join(', '));
        } else if (value instanceof Date) {
          row.push(format(value, 'yyyy-MM-dd HH:mm:ss'));
        } else if (value === null || value === undefined) {
          row.push('');
        } else {
          row.push(String(value));
        }
      });
      
      return row;
    });

    // Combine headers and rows
    const csvContent = [
      headers.map(header => `"${header}"`).join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return csvContent;
  } catch (error) {
    console.error('Error converting data to CSV:', error);
    throw new Error('Failed to generate CSV file');
  }
}

export function downloadCSV(csvContent: string, filename: string) {
  try {
    // Create blob with UTF-8 BOM for Excel compatibility
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw new Error('Failed to download CSV file');
  }
}