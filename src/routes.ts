import MainPage from './pages/MainPage/MainPage';
import { IRoute } from './types/IRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

export const publicRoutes: IRoute[] = [
    { page: MainPage, path: '/a/:nickname' },
    { page: LoginPage, path: '/login' },
];

export const privateRoutes: IRoute[] = [
    { page: MainPage, path: '/a/:nickname' },
    { page: SettingsPage, path: '/settings' },
];
