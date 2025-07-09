import { 
  Users, 
  BarChart3, 
  Map, 
  Building2, 
  UserCheck, 
  History, 
  Settings,
  Plus
} from 'lucide-react';
import { Link, useLocation } from "react-router";

// begin Page Components
import OverviewPage from "./pages/OverviewPage";
import MapPage from "./pages/MapPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import PatientsPage from './pages/PatientsPage';
// end Page Components

const Sidebar = () => {
  const menuItems = [
    { id: 'patients', label: 'Patients', icon: Users, component: PatientsPage },
    { id: 'overview', label: 'Overview', icon: BarChart3, component: OverviewPage },
    { id: 'map', label: 'Map', icon: Map, component: MapPage },
    { id: 'departments', label: 'Departments', icon: Building2, component: DepartmentsPage },
    { id: 'doctors', label: 'Doctors', icon: UserCheck, component: DoctorsPage },
    { id: 'history', label: 'History', icon: History, component: HistoryPage },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsPage },
  ];

  const location = useLocation();
  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col border-r border-gray-200">
      <div className="bg-white border-b border-gray-200 px-6 py-4 h-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">H-care</span>
        </div>
      </div>

     
      {/* Navigation Menu */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <ul className="" style={{marginLeft: 0}}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Xác định active dựa trên pathname
            const isActive = location.pathname === `/${item.id}` || (item.id === 'overview' && location.pathname === '/');
            return (
              <li key={item.id}>
                <Link
                  to={item.id === 'overview' ? '/' : `/${item.id}`}
                  className={`sidebar-link w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left no-underline ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

     
    </div>
  );
};

export default Sidebar