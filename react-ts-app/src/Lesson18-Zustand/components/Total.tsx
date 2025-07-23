import React from 'react';
import { useShoppingCartStore } from '../stores/useShoppingCartStore';

type Props = {};

export default function Total({}: Props) {
  const { items } = useShoppingCartStore((state) => state);
  // const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let total = 0;
  items.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return <div>Total: {total}</div>;
}
