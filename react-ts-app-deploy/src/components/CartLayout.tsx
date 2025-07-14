import { Link, Outlet } from 'react-router'

const CartLayout = () => {
  return (
    <div className='container mx-auto'>
          <nav className="mb-6 space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
        </nav>
         <main>
            <Outlet />
        </main>
    </div>
  )
}

export default CartLayout