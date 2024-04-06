import { User } from 'firebase/auth';

export interface IAuthContext {
   user: User | null | undefined;
   loadingUser: boolean;
   errorUser: Error | undefined;
}
