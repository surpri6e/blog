import MainPage from './pages/MainPage/MainPage';
import { IRoute } from './types/IRoute';
import LoginPage from './pages/LoginPage/LoginPage';

export const publicRoutes: IRoute[] = [
    { page: MainPage, path: '/:nickname' },
    { page: LoginPage, path: '/login' },
];

export const privateRoutes: IRoute[] = [{ page: MainPage, path: '/:nickname' }];
