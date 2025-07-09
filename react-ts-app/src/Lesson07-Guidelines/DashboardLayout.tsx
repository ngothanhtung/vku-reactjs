import { Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

// Header Component
const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 btn_ghost">
            <Bell className="w-5 h-5 " />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Emma Kwan</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Dashboard Component
const DashboardLayout = () => {
 
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Content Area - This is the red box area from the design */}
        <main className="flex-1 bg-white overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;