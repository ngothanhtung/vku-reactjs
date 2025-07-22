import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import EmptyLayout from './layouts/EmptyLayout';
import { routes, type RouteItem } from './routes';
import NotFoundPage from './modules/notfound/NotFoundPage';

// Đệ quy sinh route từ mảng routes
function renderRoutes(routes: RouteItem[], parentIsPrivate = false) {
  return routes.map((route) => {
    const Layout = route.isPrivate || parentIsPrivate ? DashboardLayout : EmptyLayout;
    if (route.children && route.children.length > 0) {
      // Route cha bọc Layout, các con chỉ render element
      return (
        <Route key={route.key} path={route.path || ''} element={<Layout />}>
          {/* Nếu có element ở cha, render ở index */}
          {route.element && <Route index element={route.element} />}
          {/* Các route con không bọc lại Layout */}
          {route.children.map(child =>
            child.children && child.children.length > 0
              ? renderRoutes([child], route.isPrivate || parentIsPrivate)
              : <Route key={child.key} path={child.path || ''} element={child.element || <div>{child.label} Page</div>} />
          )}
        </Route>
      );
    }
    // Route không có children, vẫn bọc Layout phù hợp
    return (
      <Route key={route.key} path={route.path || ''} element={<Layout />}>
        {route.element && <Route index element={route.element} />}
      </Route>
    );
  });
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
