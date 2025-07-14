import Link from "next/link"
import Image from "next/image"
import { User, Mail, Shield } from 'lucide-react'

// Thay đổi comment và thêm revalidate cho ISR
// Incremental Static Regeneration (ISR) - trang này sẽ được pre-render và regenerate mỗi 60 giây

// Thêm revalidate option vào fetch function
async function getUsers() {
  const res = await fetch("https://api.escuelajs.co/api/v1/users", {
    next: { revalidate: 60 * 4 } // ISR: revalidate mỗi 4 phút
  })
  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Next.js Demo Store</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium">
                Trang chủ (SSG)
              </Link>
              <Link href="/users" className="text-blue-600 font-medium">
                Users (SSG)
              </Link>
              <Link href="/search" className="text-gray-900 hover:text-blue-600 font-medium">
                Tìm kiếm (CSR)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Danh sách người dùng</h2>
          <p className="text-gray-600">
            Trang này sử dụng Incremental Static Regeneration (ISR) - được pre-render và tự động cập nhật mỗi 60 giây
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: any) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=64&width=64"}
                      alt={user.name}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Shield className="w-4 h-4 mr-1" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>ID: {user.id}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-blue-600 hover:text-blue-800 font-medium">Xem chi tiết →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
