import { User } from 'firebase/auth';
import './BurgerMenu.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IFirebase } from '../../types/IFirebase';

interface IBurgerMenu {
   loadingUser: boolean;
   user: User | null | undefined;
   value: IFirebase | undefined;
   signOut: () => Promise<boolean>;
}

const BurgerMenu: FC<IBurgerMenu> = ({ loadingUser, user, signOut, value }) => {
   return (
      <div className='menu'>
         <input type='checkbox' id='burger-checkbox' className='burger-checkbox' />
         <label htmlFor='burger-checkbox' className='burger'></label>
         <ul className='menu-list'>
            {loadingUser ? (
               <></>
            ) : !user ? (
               // If user not logging
               <li>
                  <Link to={'/login'} className='menu-item'>
                     Войти
                  </Link>
               </li>
            ) : (
               // If user logging
               <>
                  <li>
                     <Link to={`/a/${user?.displayName ? user.displayName : user.uid}`} className='menu-item'>
                        Профиль
                     </Link>
                  </li>

                  {/* If user has profile */}
                  {value ? (
                     <li>
                        <Link to={'/settings'} className='menu-item'>
                           Настройки
                        </Link>
                     </li>
                  ) : (
                     <></>
                  )}

                  <li>
                     <div onClick={() => signOut()} className='menu-item'>
                        Выйти
                     </div>
                  </li>
               </>
            )}
         </ul>
      </div>
   );
};

export default BurgerMenu;
