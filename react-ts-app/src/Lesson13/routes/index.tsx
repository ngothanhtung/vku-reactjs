import Login from '../pages/Login';
import MyTasks from '../pages/MyTasks';
import Tasks from '../pages/Tasks';

const routes = [
  {
    path: '/login',
    showOnMenu: false,
    isPublic: true,
    name: 'Login',
    index: true,
    element: <Login />,
  },
  {
    path: '/home',
    showOnMenu: true,
    name: 'Home',
    index: true,
    element: <Tasks />,
    roles: ['Users', 'Managers', 'Leaders'],
  },
  {
    path: '/tasks',
    showOnMenu: true,
    name: 'Tasks',
    index: true,
    element: <Tasks />,
    roles: ['Managers', 'Leaders'],
  },

  {
    path: '/my-tasks',
    showOnMenu: true,
    name: 'My Tasks',
    index: true,
    element: <MyTasks />,
    roles: ['users'],
  },

  {
    path: '/security',
    showOnMenu: true,
    name: 'Security',
    index: true,
    element: <div>Security</div>,
    roles: ['Administrators'],
  },
];
export default routes;
