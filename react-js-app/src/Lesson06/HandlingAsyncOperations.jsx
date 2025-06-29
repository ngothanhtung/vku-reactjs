import React, { useState, useEffect } from 'react';

export default function HandlingAsyncOperations() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        console.log('Data fetched successfully:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>HandlingAsyncOperations</div>;
}
