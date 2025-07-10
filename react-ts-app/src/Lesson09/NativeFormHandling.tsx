import React from 'react';

export default function NativeFormHandling() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
