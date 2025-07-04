import { createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products = [
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 },
  { id: '3', name: 'Product 3', price: 300 },
];

const ShoppingCartContext = createContext<any>({
  items: [] as CartItem[],
  addItem: (item: CartItem) => {},
  removeItem: (itemId: string) => {},
});

export default function ContextExample() {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });

  const addItem = (item: CartItem) => {
    setCart((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, setCart }}>
      <div>
        {products.map((item, index) => {
          return (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h5>{item.name}</h5>
              <p>Price: ${item.price}</p>
              <button onClick={() => addItem({ product: item, quantity: 1 })}>Add to Cart</button>
            </div>
          );
        })}
        <TotalLabel />
      </div>
    </ShoppingCartContext.Provider>
  );
}

function TotalLabel() {
  const { cart } = useContext(ShoppingCartContext);
  // let total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // using forEach to calculate total
  let total = 0;
  cart.items.forEach((item: CartItem) => {
    total += item.product.price * item.quantity;
  });
  return <h3>Total: {total}</h3>;
}
