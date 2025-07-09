import { BrowserRouter, Routes, Route } from "react-router";
import OverviewPage from "./pages/OverviewPage";
import MapPage from "./pages/MapPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import PatientsPage from './pages/PatientsPage';
import DashboardLayout from "./DashboardLayout";

const DashboardApp = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default DashboardApp