import StatisticsPage from '../pages/statistics/StatisticsPage';
import UsersPage from '../pages/users/UsersPage';

export const navBarRoutesConfig = [
  {
    title: 'Statistics',
    path: '/',
    exact: true,
    Element: StatisticsPage,
  },
  {
    title: 'Users',
    path: '/users',
    Element: UsersPage,
  },
];
