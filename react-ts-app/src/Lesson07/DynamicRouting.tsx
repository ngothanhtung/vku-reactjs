import { BrowserRouter, Routes, Route, useParams, useLocation, useSearchParams } from 'react-router';
import Customers from './pages/Customers';
import CustomerDetails from './pages/CustomerDetails';

function Home() {
  return <h2>Home Page</h2>;
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}

function Search() {
  const location = useLocation();
  // search?name=John&address=Seoul
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name');
  const address = searchParams.get('address');

  console.log(location);
  console.log(name, address);
  return (
    <div>
      <h2>Search Page</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchParams({ name: e.target.name.value, address: e.target.address.value });
        }}
      >
        <input type='text' name='name' placeholder='Name' defaultValue={name} />
        <input type='text' name='address' placeholder='Address' defaultValue={address} />
        <button type='submit'>Search</button>
      </form>
      <p>Current Search Params: {location.search}</p>
      <p>Name: {name}</p>
      <p>Address: {address}</p>
    </div>
  );
}

function User() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}
export default function DynamicRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/customers/:id' element={<CustomerDetails />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
