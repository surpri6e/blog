import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth, database } from '../../main';
import { Link, useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IFirebase } from '../../types/IFirebase';
import { DocumentReference, doc } from 'firebase/firestore';
import FixedMessages from '../FixedMessages/FixedMessages';
import { fixMessages } from '../../utils/fixMessages';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
   const { nickname } = useParams();

   const [value] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);

   const [user] = useAuthState(auth);

   const [valueUser] = useDocumentData<IFirebase>(doc(database, 'users', user?.uid ? user.uid : ' ') as DocumentReference<IFirebase>);

   const [signOut] = useSignOut(auth);

   return (
      <div className='header'>
         <div className='_Container'>
            <div className='header_body'>
               <div className='header_left'>
                  {user?.uid === nickname && value && value.blocks.filter((elem) => elem.isFixed).length > 0 ? (
                     <FixedMessages blocks={fixMessages(value.blocks)} />
                  ) : user?.uid != nickname && value && value.blocks.filter((elem) => !elem.isPrivate).filter((elem) => elem.isFixed).length > 0 ? (
                     <FixedMessages blocks={fixMessages(value.blocks.filter((elem) => !elem.isPrivate))} />
                  ) : (
                     <div className='other-text'>Нет закрепленных сообщений.</div>
                  )}
               </div>

               <div className='header_right'>
                  <BurgerMenu user={user} signOut={signOut} valueUser={valueUser} />

                  {!user && (
                     // If user not logging
                     <Link to={'/login'} className='buttons'>
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
                           <Link to={'/settings'} className='buttons'>
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
