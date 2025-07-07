import React, { use, useEffect } from 'react';

type Props = {};

export default function SubscriptionExamples({}: Props) {
  const [time, setTime] = React.useState(new Date());
  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      console.log('Timer tick');
      setTime(new Date());
    }, 1000);

    // Unmount cleanup
    // This function will be called when the component is unmounted
    return () => {
      console.log('Timer stopped');
      clearInterval(timer);
    };
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
}
