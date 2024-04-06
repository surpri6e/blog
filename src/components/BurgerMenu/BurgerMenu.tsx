import { User } from 'firebase/auth';
import './BurgerMenu.scss';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IFirebase } from '../../types/IFirebase';
import { AuthContext } from '../../context/AuthContext';
import { loginPath, settingsPath } from '../../constants';

interface IBurgerMenu {
   valueUser: IFirebase | undefined;
   signOut: () => Promise<boolean>;
}

const BurgerMenu: FC<IBurgerMenu> = ({ signOut, valueUser }) => {
   const { user } = useContext(AuthContext);

   return (
      <div className='menu'>
         <input type='checkbox' id='burger-checkbox' className='burger-checkbox' />
         <label htmlFor='burger-checkbox' className='burger'></label>
         <ul className='menu-list'>
            {!user && (
               // If user not logging
               <li>
                  <Link to={loginPath} className='menu-item'>
                     Войти
                  </Link>
               </li>
            )}

            {user && (
               // If user logging
               <>
                  <li>
                     <Link to={`/a/${user.uid}`} className='menu-item'>
                        Профиль
                     </Link>
                  </li>

                  {/* If user has profile */}
                  {valueUser && (
                     <li>
                        <Link to={settingsPath} className='menu-item'>
                           Настройки
                        </Link>
                     </li>
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
