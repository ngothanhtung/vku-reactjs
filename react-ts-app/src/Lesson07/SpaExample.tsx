import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import Page404 from './pages/Page404';
import { Link } from 'react-router';

type Props = {};

export default function SpaExample({}: Props) {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/contact'>Contact</Link>
      </nav>

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
        <Route path='/' element={<div>Home</div>} />
        <Route path='/about' element={<div>About</div>} />
        <Route path='/contact' element={<div>Contact</div>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
