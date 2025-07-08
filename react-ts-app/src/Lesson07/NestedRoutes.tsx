import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Page404 from './pages/Page404';
import Contact from './pages/Contact';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Layout() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fcff5b' }}>
      <Outlet />
    </div>
  );
}

export default function NestedRoutes() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to='/' style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink to='/about' style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
          About
        </NavLink>{' '}
        |{' '}
        <NavLink to='/contact' style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
          Contact
        </NavLink>
      </nav>
      <hr />
      <Routes>
        <Route path='/administration' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
