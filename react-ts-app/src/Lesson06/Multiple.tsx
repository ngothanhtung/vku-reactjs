import React, { useEffect } from 'react';

export default function Multiple() {
  useEffect(() => {
    console.log('Effect 1');
  }, []);
  useEffect(() => {
    console.log('Effect 2');
  }, []);

  return <div>Multiple</div>;
}
