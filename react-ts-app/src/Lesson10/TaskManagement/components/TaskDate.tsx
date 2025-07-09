import React from 'react';

type Props = {
  date: Date;
  format?: 'short' | 'long';
};

export default function TaskDate({ date, format }: Props) {
  const formatDate = (date: Date, format: 'short' | 'long' | undefined) => {
    if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const formattedDate = formatDate(date, format);
  return <div>{formattedDate}</div>;
}
