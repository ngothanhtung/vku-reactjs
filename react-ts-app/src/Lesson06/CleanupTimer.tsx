import React, { useEffect } from 'react';

export default function CleanupTimer() {
  const [time, setTime] = React.useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>CleanupTimer: {time.toLocaleTimeString()}</div>;
}
