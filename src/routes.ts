import MainPage from './pages/MainPage/MainPage';
import MePage from './pages/MePage/MePage';
import { IRoute } from './types/IRoute';

export const publicRoutes: IRoute[] = [
    { page: MainPage, path: '/' },
    { page: MePage, path: '/me' },
];

export const privateRoutes: IRoute[] = [{ page: MainPage, path: '/' }];
