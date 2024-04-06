import { IFirebase } from '../../types/IFirebase';
import './SettingsPage.scss';
import { database, storage } from '../../main';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, doc } from 'firebase/firestore';
import Loader from '../../components/Loader/Loader';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserUpdate } from '../../api/FirebaseApi';
import HelpWindow from '../../components/HelpWindow/HelpWindow';
import { isLink } from '../../utils/isLink';
import { formatBytesToBytes } from 'bytes-transform';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { configFirebase } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const SettingsPage = () => {
   const { user, loadingUser, errorUser } = useContext(AuthContext);
   const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', user?.uid ? user.uid : ' ') as DocumentReference<IFirebase>);
   const [uploadFile] = useUploadFile();

   const navigate = useNavigate();

   const [about, setAbout] = useState('');

   const [socialUrl, setSocialUrl] = useState('');
   const [isLinkError, setIsLinkError] = useState(false);

   const [name, setName] = useState('');
   const [isNameError, setIsNameError] = useState(false);

   const [photo, setPhoto] = useState<File>();
   const [isPhotoError, setIsPhotoError] = useState(false);

   useEffect(() => {
      setSocialUrl(value?.socialUrl ? value.socialUrl : '');
      setName(value?.name ? value.name : '');
      setAbout(value?.about ? value.about : '');
   }, [value]);

   useEffect(() => {
      if ((photo && photo.size > formatBytesToBytes(3, 'MB')) || (photo && photo.type != 'image/png' && photo.type != 'image/jpeg')) {
         setIsPhotoError(true);
      } else {
         setIsPhotoError(false);
      }
   }, [photo]);

   return (
      <div className='settings'>
         <div className='_Container'>
            <div className='settings_body'>
               <div className='settings_forms'>
                  {(loadingUser || loading) && <Loader />}

                  {(error || errorUser) && !(loadingUser || loading) && <div className='other-text'>Что-то пошло не так.</div>}

                  {!(user && value) && !(loadingUser || loading) && <div className='other-text'>Ваш профиль еще не создан.</div>}

                  {user && value && !(loadingUser || loading) && (
                     <>
                        <div className='settings_block'>
                           <div className='create_text'>Фотография:</div>

                           {isPhotoError && <HelpWindow title='Проверьте тип файла и его размер' />}
                           <input
                              type='file'
                              className='inputs settings_photo'
                              onChange={(e) => {
                                 const file = e.target.files ? e.target.files[0] : undefined;
                                 setPhoto(file);
                              }}
                           />
                        </div>

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
                                 if (!(name.length > 0)) {
                                    setIsNameError(true);
                                    setTimeout(() => {
                                       setIsNameError(false);
                                    }, 2000);
                                 }

                                 if (!isLink(socialUrl)) {
                                    setIsLinkError(true);
                                    setTimeout(() => {
                                       setIsLinkError(false);
                                    }, 2000);
                                 }

                                 if (isLink(socialUrl) && name.length > 0 && !isPhotoError) {
                                    if (photo) {
                                       await uploadFile(ref(storage, `${user.uid}.png`), photo, {
                                          contentType: 'image/png',
                                       });

                                       await setUserUpdate({
                                          ...value,
                                          socialUrl: socialUrl.length === 0 ? '#' : socialUrl,
                                          about,
                                          name,
                                          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${configFirebase.storageBucket}/o/${user.uid}.png?alt=media`,
                                       });
                                    } else {
                                       await setUserUpdate({
                                          ...value,
                                          socialUrl: socialUrl.length === 0 ? '#' : socialUrl,
                                          about,
                                          name,
                                       });
                                    }

                                    navigate(`/a/${user.uid}`);
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
