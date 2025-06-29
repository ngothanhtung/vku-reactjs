import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Home Page</h2>
      <button
        onClick={() => {
          // Programmatic navigation to the About page
          // window.location.href = '/about';
          navigate('/about');
        }}
      >
        Go to About Page
      </button>
    </div>
  );
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}

function About() {
  return <h2>About Page</h2>;
}
export default function ProgrammaticNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
