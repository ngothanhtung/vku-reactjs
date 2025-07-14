import { Routes, Route, BrowserRouter } from 'react-router';
import ProductList from './ProductList';
import CartPage from './CartPage';
import NoPage from './NoPage';
import CartLayout from './CartLayout';


export default function CartManager() {
  return (
    
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<CartLayout />}>
            <Route index element={<ProductList />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NoPage />} />
         </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
