import React, { useLayoutEffect } from 'react';

// This is a simple component that uses useLayoutEffect to log the body's offsetWidth
// when the component mounts. This is useful for measuring layout before the browser paints.
// It can be used to ensure that measurements are accurate and not affected by any visual changes
// that might occur after the component has rendered.
export default function LayoutEffect() {
  const [width, setWidth] = React.useState(document.body.offsetWidth);

  useLayoutEffect(() => {
    console.log(document.body.offsetWidth);
    setWidth(document.body.offsetWidth);
    // This effect runs synchronously after all DOM mutations.
  }, []);

  return <div>Measure: {width}</div>;
}
