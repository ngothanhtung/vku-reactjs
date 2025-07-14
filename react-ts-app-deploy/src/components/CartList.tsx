import { useCartContext } from '../context/CartContext';

export default function CartList() {
  const { cart } = useCartContext();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="border p-3 rounded">
              <p><strong>{item.name}</strong> - ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}