"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"

// Client-Side Rendering (CSR) - component này chạy hoàn toàn trên client
export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=8&title=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setProducts(data)
      setSearched(true)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    searchProducts(query)
  }

  // Load all products on component mount
  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8")
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAllProducts()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tìm kiếm sản phẩm</h2>
          <p className="text-gray-600">
            Trang này sử dụng Client-Side Rendering (CSR) - tìm kiếm được thực hiện trên client
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập tên sản phẩm để tìm kiếm..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tìm...
                </>
              ) : (
                "Tìm kiếm"
              )}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Đang tải...</span>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {searched
                  ? `Tìm thấy ${products.length} sản phẩm cho "${query}"`
                  : `Hiển thị ${products.length} sản phẩm`}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="aspect-square relative">
                        <Image
                          src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                          alt={product.title}
                          fill
                          className="object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
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
            )}
          </>
        )}
      </main>
    
  )
}
