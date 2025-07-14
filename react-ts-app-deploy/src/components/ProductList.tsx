import { useCartContext } from '../context/CartContext';

const mockProducts = [
  { id: '1', name: 'Laptop', price: 1200 },
  { id: '2', name: 'Smartphone', price: 800 },
  { id: '3', name: 'Headphones', price: 150 },
];

export default function ProductList() {
  const { addToCart } = useCartContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {mockProducts.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p className="mb-2">Price: ${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}