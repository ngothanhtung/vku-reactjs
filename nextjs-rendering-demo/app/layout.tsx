import Link from "next/link"
import "../styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="banner-top h-[40px] w-full">
            <img className="w-full h-auto object-cover" src="images/banner-top.png" alt="Banner Top" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Next.js Demo Store</h1>
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium">
                  Trang chủ (SSG)
                </Link>
                <Link href="/users" className="text-gray-900 hover:text-blue-600 font-medium">
                  Users (ISR)
                </Link>
                <Link href="/search" className="text-gray-900 hover:text-blue-600 font-medium">
                  Tìm kiếm (CSR)
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
