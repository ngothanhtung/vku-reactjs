import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function PropsWithChildren({ children }: Props) {
  return (
    <div>
      <h2>PropsWithChildren</h2>
      <div>{children}</div>
    </div>
  );
}
