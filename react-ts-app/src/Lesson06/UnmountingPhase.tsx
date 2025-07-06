import React, { useEffect } from 'react';

export default function UnmountingPhase() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Timer</div>;
}
