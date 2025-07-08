import CategoriesTree from "../components/CategoriesTree"
import ProductGrid from "../components/ProductGrid"
import ProductPagination from "../components/ProductPagination"

const ProductPage = () => {
  return (
    <div className="product-layout flex gap-x-2">
        <aside className="w-1/5">
            <CategoriesTree />
        </aside>
        <section className="product-content flex-1">
            <ProductGrid />
            <ProductPagination total={25} />
        </section>
    </div>
  )
}

export default ProductPage