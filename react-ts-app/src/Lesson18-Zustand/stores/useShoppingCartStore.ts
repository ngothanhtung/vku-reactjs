/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
}

interface CartItem {
  product: Product; // Replace 'any' with your product type
  quantity: number;
}

interface ShoppingCartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  decreaseItemQuantity: (productId: number) => void;
}
export const useShoppingCartStore = create<ShoppingCartState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          items: [],
          addItem: (product: Product, quantity: number) => {
            set((state) => {
              const existingItem = state.items.find((item) => item.product.id === product.id);
              if (existingItem) {
                existingItem.quantity += quantity;
              } else {
                state.items.push({ product, quantity });
              }
              return { items: [...state.items] };
            });
          },

          removeItem: (productId: number) => {
            set((state) => {
              const updatedItems = state.items.filter((item) => item.product.id !== productId);
              return { items: updatedItems };
            });
          },

          decreaseItemQuantity: (productId: number) => {
            set((state) => {
              const existingItem = state.items.find((item) => item.product.id === productId);
              if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
              } else {
                // Remove item if quantity is 1
                state.items = state.items.filter((item) => item.product.id !== productId);
              }
              return { items: [...state.items] };
            });
          },
        };
      },
      {
        name: 'shopping-cart',
      }
    )
  )
);
