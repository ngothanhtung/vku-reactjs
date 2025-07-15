import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div>
      <h1>Shop Layout</h1>
      <hr />
      <div style={{ backgroundColor: 'orange' }}> {children}</div>
    </div>
  );
}
