import MainPage from './pages/MainPage/MainPage';
import { IRoute } from './types/IRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { loginPath, mainPath, settingsPath } from './constants';

export const publicRoutes: IRoute[] = [
   { page: MainPage, path: mainPath },
   { page: LoginPage, path: loginPath },
];

export const privateRoutes: IRoute[] = [
   { page: MainPage, path: mainPath },
   { page: SettingsPage, path: settingsPath },
];
