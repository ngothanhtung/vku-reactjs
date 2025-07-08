import { Link } from "react-router"

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-2">
        <div className="container">
            <div className="header-middle flex justify-between items-center">
                    <div className="logo text-3xl">
                        Magazines
                    </div>
                    <nav>
                        <ul className="flex gap-x-3">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/category">Category</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/customer">Customer</Link>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
    </header>
  )
}

export default Header