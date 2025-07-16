import Link from "next/link"
//import Image from "next/image"

// Static Site Generation (SSG) - trang này sẽ được pre-render tại build time
async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=15&limit=8")
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="banner my-5 rounded overflow-hidden">
        <img className="rounded" src="images/banner-1200.png" alt="banner-1200" />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sản phẩm nổi bật</h2>
        <p className="text-gray-600">
          Trang này sử dụng Static Site Generation (SSG) - được pre-render tại build time
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* <div className="aspect-square relative">
                <Image
                  src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
               
              </div> */}

               <img src={product.images[0]} alt={product.title} />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {product.category?.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
