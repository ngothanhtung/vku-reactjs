import { useEffect } from 'react';

export default function DomUpdateExamples() {
  useEffect(() => {
    // Update title
    document.title = 'DomUpdateExamples';
  }, []);
  return <div>DomUpdateExamples</div>;
}
