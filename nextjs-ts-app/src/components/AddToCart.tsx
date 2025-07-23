/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
import React from 'react';

type Props = {
  product: any; // Replace 'any' with your product type
  quantity?: number; // Optional, default to 1 if not provided
};

export default function AddToCart({ product, quantity = 1 }: Props) {
  const { addItem } = useShoppingCartStore((state) => state);
  return (
    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => addItem(product, quantity)}>
      Add to Cart
    </button>
  );
}
