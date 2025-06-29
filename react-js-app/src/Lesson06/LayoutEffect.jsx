import React, { useLayoutEffect } from 'react';

export default function LayoutEffect() {
  useLayoutEffect(() => {
    console.log(document.body.offsetWidth);
  }, []);

  return <div>Measure</div>;
}
