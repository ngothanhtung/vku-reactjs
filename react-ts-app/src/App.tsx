// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import NoPage from './pages/NoPage';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfile from './pages/CustomerProfile';
import CustomerLayout from './layouts/CustomerLayout';
import CustomerOrders from './pages/CustomerOrders';

import { Button, HStack } from '@chakra-ui/react';
import { RiArrowRightLine, RiMailLine } from 'react-icons/ri';
function App() {
  return (
    <BrowserRouter>
      <HStack>
        <Button variant="solid">
          <RiMailLine /> Email
        </Button>
        <Button loading loadingText="Loading" spinnerPlacement="end" colorPalette={'orange'} variant="surface">
          Call us <RiArrowRightLine />
        </Button>
      </HStack>
      {/* <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:slug" element={<ProductDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="customer/" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
