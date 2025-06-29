import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router';

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
      <Nav />
      <hr />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
