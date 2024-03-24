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
   const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
   const [user, loadingUser, errorUser] = useAuthState(auth);

   const [signOut, , errorSignOut] = useSignOut(auth);

   return (
      <div className='header'>
         <div className='_Container'>
            <div className='header_body'>
               {/* Handle error */}
               {error || errorUser || errorSignOut ? (
                  <></>
               ) : (
                  <>
                     <div className='header_left'>
                        {/* If user has fixed message shows it */}
                        {loading || loadingUser ? (
                           <></>
                        ) : value && value.blocks.filter((elem) => elem.isFixed).length > 0 ? (
                           <FixedMessages blocks={fixMessages(value.blocks)} />
                        ) : (
                           <div className='other-text'>Нет закрепленных сообщений.</div>
                        )}
                     </div>

                     <div className='header_right'>
                        <BurgerMenu loadingUser={loadingUser} user={user} signOut={signOut} value={value} />

                        {loadingUser ? (
                           <></>
                        ) : !user ? (
                           // If user not logging
                           <Link to={'/login'} className='buttons'>
                              Войти
                           </Link>
                        ) : (
                           // If user logging
                           <>
                              <Link to={`/a/${user?.displayName ? user.displayName : user.uid}`} className='buttons'>
                                 Профиль
                              </Link>

                              {/* If user has profile */}
                              {value ? (
                                 <Link to={'/settings'} className='buttons'>
                                    Настройки
                                 </Link>
                              ) : (
                                 <></>
                              )}

                              <button onClick={() => signOut()} className='buttons'>
                                 Выйти
                              </button>
                           </>
                        )}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
