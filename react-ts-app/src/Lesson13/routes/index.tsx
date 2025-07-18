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
    roles: [],
  },
  {
    path: '/home',
    showOnMenu: true,
    name: 'Home',
    index: true,
    element: <Tasks />,
    roles: ['managers', 'leaders', 'users'],
  },
  {
    path: '/tasks',
    showOnMenu: true,
    name: 'Tasks',
    index: true,
    element: <Tasks />,
    roles: ['managers', 'leaders'],
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
    roles: ['sdsds'],
  },
];
export default routes;
