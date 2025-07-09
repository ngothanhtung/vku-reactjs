import { Link } from "react-router"
import { Outlet } from "react-router"
const CustomerLayout = () => {
  return (
    <div className="customer-layout flex gap-x-5">
      <aside className="customer-sidebar w-[200px] bg-gray-300 p-5">
          <div className="categories flex flex-col gap-y-3">
              <Link to="/customer">Dashboard</Link>
              <Link to="/customer/orders">Orders</Link>
              <Link to="/customer/profile">Profile</Link>
          </div>
      </aside>
      <section className="customer-content flex-1">
        <Outlet />
      </section>
    </div>
  )
}

export default CustomerLayout