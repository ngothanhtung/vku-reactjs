import { Outlet } from "react-router"
import { Link } from "react-router"

const UserLayout = () => {
  return (
    <div className="container mx-auto">
         <nav className="mb-6 space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/users" className="text-blue-600 hover:underline">Users</Link>
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default UserLayout