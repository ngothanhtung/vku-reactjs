import React from 'react';

type Props = {
  // name: string;
  width: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  array?: string[];
  object?: { [key: string]: any };
  children?: React.ReactNode;
};

export default function Button({ children, width, disabled = false, style = {} }: Props) {
  return (
    <button style={{ width, ...style }} disabled={disabled}>
      {children}
    </button>
  );
}
