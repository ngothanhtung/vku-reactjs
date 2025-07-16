import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div>
      <h1 className='text-4xl font-bold'>Shop</h1>
      <hr className='border-t border-gray-300 my-[20px]' />
      <div style={{}}> {children}</div>
    </div>
  );
}
