import React from 'react';
import { getProducts } from './services/product.service';
import { useShoppingCartStore } from './stores/useShoppingCartStore';

type Props = {};

export default function Products({}: Props) {
  // Zustand
  const { addItem } = useShoppingCartStore((state) => state);

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();

      setProducts(response.data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.discount}</td>
              <td>
                <button
                  onClick={() => {
                    // Add to cart logic here
                    addItem(product, 1);
                  }}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
