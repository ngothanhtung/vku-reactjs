import React, { useEffect } from 'react';

function UpdatingPhase({ count }) {
  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  return <div>{count}</div>;
}

export default UpdatingPhase;
