import React, { useEffect } from 'react';

type Props = {
  count: number;
};

function UpdatingPhase({ count }: Props) {
  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  return <div>{count}</div>;
}

export default UpdatingPhase;
