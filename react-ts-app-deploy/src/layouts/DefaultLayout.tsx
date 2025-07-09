import { Outlet } from "react-router"
import Footer from "../components/Footer"
import Header from "../components/Header"

const DefaultLayout = () => {
  return (
    <>
    <Header />
    <main className="my-5">
        <section className="container mx-auto">
          <Outlet />
        </section>
    </main>
    <Footer />
    </>
  )
}

export default DefaultLayout