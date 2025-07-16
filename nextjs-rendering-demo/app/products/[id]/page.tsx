import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

// Server-Side Rendering (SSR) - trang này sẽ được render render lại sau thời gian hết hạn cache
async function getProduct(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch product")
  }
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại trang chủ
        </Link>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chi tiết sản phẩm</h2>
          <p className="text-gray-600">
            Trang này sử dụng Server-Side Rendering (SSR) - được render trên server cho mỗi request
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {/* <div className="aspect-square relative">
                <Image
                  src={product.images[0] || "/placeholder.svg?height=500&width=500"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div> */}
              <div>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {product.images.slice(1, 4).map((image: string, index: number) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 relative">
                    {/* <div key={index} className="flex-shrink-0 w-20 h-20 relative"> */}
                      {/* <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 2}`}
                        fill
                        className="object-cover rounded"
                        crossOrigin="anonymous"
                      /> */}
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 2}`}
                        className="w-full h-full object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category?.name}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Thêm vào giỏ hàng
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Mua ngay
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Thông tin sản phẩm:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>ID: {product.id}</li>
                  <li>Danh mục: {product.category?.name}</li>
                  <li>Ngày tạo: {new Date(product.creationAt).toLocaleDateString("vi-VN")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    
  )
}
