import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import CustomerLayout from './layouts/CustomerLayout';
import DefaultLayout from './layouts/DefaultLayout';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerOrders from './pages/CustomerOrders';
import CustomerProfile from './pages/CustomerProfile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoPage from './pages/NoPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
