import { useAuthState } from 'react-firebase-hooks/auth';
import { IFirebase } from '../../types/IFirebase';
import './SettingsPage.scss';
import { auth, database } from '../../main';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, doc } from 'firebase/firestore';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserUpdate } from '../../api/FirebaseApi';
import HelpWindow from '../../components/HelpWindow/HelpWindow';
import { isLink } from '../../utils/isLink';

const SettingsPage = () => {
   const [user, loadingUser, errorUser] = useAuthState(auth);
   const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', user?.uid ? user.uid : ' ') as DocumentReference<IFirebase>);

   const navigate = useNavigate();

   const [socialUrl, setSocialUrl] = useState('');
   const [isLinkError, setIsLinkError] = useState(false);

   const [name, setName] = useState('');
   const [isNameError, setIsNameError] = useState(false);

   const [about, setAbout] = useState('');

   //const [photo, setPhoto] = useState<File>();

   useEffect(() => {
      setSocialUrl(value?.socialUrl ? value.socialUrl : '');
      setName(value?.name ? value.name : '');
      setAbout(value?.about ? value.about : '');
   }, [value]);

   return (
      <div className='settings'>
         <div className='_Container'>
            <div className='settings_body'>
               <div className='settings_forms'>
                  {(loadingUser || loading) && <Loader />}

                  {(error || errorUser) && !(loadingUser || loading) && <div className='other-text'>Что-то пошло не так.</div>}

                  {!(user && value) && !(loadingUser || loading) && !(error || errorUser) && <div className='other-text'>Ваш профиль еще не создан.</div>}

                  {user && value && !(loadingUser || loading) && (
                     <>
                        <div className='settings_block'>
                           <div className='create_text'>Социальная ссылка:</div>

                           {isLinkError && <HelpWindow title='Это не ссылка' />}
                           <input
                              type='text'
                              value={socialUrl}
                              className='inputs'
                              onChange={(e) => setSocialUrl(e.target.value)}
                              placeholder='https://www.com'
                           />
                        </div>

                        <div className='settings_block'>
                           <div className='create_text'>Имя:</div>

                           {isNameError && <HelpWindow title='У вас должно быть имя' />}
                           <input type='text' value={name} className='inputs' onChange={(e) => setName(e.target.value)} placeholder='Твое имя' />
                        </div>

                        <div className='settings_block'>
                           <div className='create_text'>О себе:</div>
                           <textarea value={about} className='inputs settings_about' onChange={(e) => setAbout(e.target.value)} placeholder='Напиши о себе' />
                        </div>

                        <div className='settings_buttons'>
                           <Link to={`/a/${user.uid}`} className='buttons buttons--red'>
                              Отклонить
                           </Link>

                           <button
                              className='buttons buttons--green'
                              // Update user's information
                              onClick={async () => {
                                 if (isLink(socialUrl) && name.length > 0) {
                                    await setUserUpdate({ ...value, socialUrl, about, name });
                                    navigate(`/a/${user.uid}`);
                                 } else {
                                    setIsLinkError(true);
                                    setIsNameError(true);

                                    setTimeout(() => {
                                       setIsLinkError(false);
                                       setIsNameError(false);
                                    }, 2000);
                                 }
                              }}
                           >
                              Подтвердить
                           </button>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SettingsPage;
