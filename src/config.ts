import { IConfigFirebase, IConfigMe } from './types/IConfigs';

export const configMe: IConfigMe = {
    login: import.meta.env.VITE_APP_LOGIN,
    password: import.meta.env.VITE_APP_PASSWORD,
};

export const configFirebase: IConfigFirebase = {
    apiKey: import.meta.env.VITE_APP_apiKey,
    appId: import.meta.env.VITE_APP_appId,
    authDomain: import.meta.env.VITE_APP_authDomain,
    messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
    projectId: import.meta.env.VITE_APP_projectId,
    storageBucket: import.meta.env.VITE_APP_storageBucket,
    measurementId: import.meta.env.VITE_APP_measurementId,
};
