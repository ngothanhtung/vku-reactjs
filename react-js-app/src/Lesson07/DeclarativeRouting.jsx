import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router';
const LazyComponent = lazy(() => import('./LazyComponent'));

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}
function NotFound() {
  return <h2>404 Not Found</h2>;
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <NavLink to='/about' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to='/lazy' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
            Lazy
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function DeclarativeRouting() {
  return (
    <BrowserRouter>
      <Nav />
      <hr />
      <Suspense fallback={<h2 style={{ color: 'red' }}>Loading...</h2>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/lazy' element={<LazyComponent />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
