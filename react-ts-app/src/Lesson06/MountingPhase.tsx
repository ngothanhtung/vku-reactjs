import React, { useEffect } from 'react';

export default function MountingPhase() {
  useEffect(() => {
    console.log('Effect ran');
  }, []);

  return <div>Counter</div>;
}
