import React from 'react';
import { useShoppingCartStore } from '../stores/useShoppingCartStore';

type Props = {};

export default function ShoppingCart({}: Props) {
  const { items, addItem, decreaseItemQuantity, removeItem } = useShoppingCartStore((state) => state);
  return (
    <div>
      Shopping Cart
      {/* TAILWINDCSS TABLE */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id} className="bg-white hover:bg-gray-100">
              <td>{item.product.id}</td>
              <td>{item.product.title}</td>
              <td className="text-right">{item.product.price}</td>
              <td className="text-right flex items-center justify-end gap-2">
                <button onClick={() => decreaseItemQuantity(item.product.id)}>-</button>
                <div style={{ minWidth: 40 }}> {item.quantity}</div>

                <button onClick={() => addItem(item.product, 1)}>+</button>
              </td>
              <td className="text-right">{item.product.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => {
                    // Confirm removal
                    const confirmRemoval = window.confirm(`Are you sure you want to remove ${item.product.title} from the cart?`);
                    if (confirmRemoval) {
                      // Remove item from cart
                      removeItem(item.product.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
