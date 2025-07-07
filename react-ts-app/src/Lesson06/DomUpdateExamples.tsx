import React, { use, useEffect } from 'react';

type Props = {};

export default function DomUpdateExamples({}: Props) {
  useEffect(() => {
    // Update title
    document.title = 'DomUpdateExamples';
  }, []);
  return <div>DomUpdateExamples</div>;
}
