import { useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth, database } from '../../main';
import { Link, useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IFirebase } from '../../types/IFirebase';
import { DocumentReference, doc } from 'firebase/firestore';
import FixedMessages from '../FixedMessages/FixedMessages';
import { fixMessages } from '../../utils/fixMessages';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useIsYourProfile } from '../../hooks/useIsYourProfile';
import { loginPath, settingsPath } from '../../constants';

const Header = () => {
   const { nickname } = useParams();
   const { user } = useContext(AuthContext);

   const isYourProfile = useIsYourProfile(nickname, user);

   const [value] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
   const [valueUser] = useDocumentData<IFirebase>(doc(database, 'users', user?.uid ? user.uid : ' ') as DocumentReference<IFirebase>);

   const [signOut] = useSignOut(auth);

   return (
      <div className='header'>
         <div className='_Container'>
            <div className='header_body'>
               <div className='header_left'>
                  {isYourProfile && value && value.blocks.filter((elem) => elem.isFixed).length > 0 ? (
                     <FixedMessages blocks={fixMessages(value.blocks)} />
                  ) : !isYourProfile && value && value.blocks.filter((elem) => !elem.isPrivate).filter((elem) => elem.isFixed).length > 0 ? (
                     <FixedMessages blocks={fixMessages(value.blocks.filter((elem) => !elem.isPrivate))} />
                  ) : (
                     <div className='other-text'>Нет закрепленных сообщений.</div>
                  )}
               </div>

               <div className='header_right'>
                  <BurgerMenu signOut={signOut} valueUser={valueUser} />

                  {!user && (
                     // If user not logging
                     <Link to={loginPath} className='buttons'>
                        Войти
                     </Link>
                  )}

                  {user && (
                     // If user logging
                     <>
                        <Link to={`/a/${user.uid}`} className='buttons'>
                           Профиль
                        </Link>

                        {/* If user has profile */}
                        {valueUser && (
                           <Link to={settingsPath} className='buttons'>
                              Настройки
                           </Link>
                        )}

                        <button onClick={() => signOut()} className='buttons'>
                           Выйти
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
