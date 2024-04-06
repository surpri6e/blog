import { createContext } from 'react';
import { IAuthContext } from '../types/IAuthContext';

export const AuthContext = createContext({} as IAuthContext);
