import About from '../../components/About/About';
import Avatar from '../../components/Avatar/Avatar';
import Blocks from '../../components/Blocks';
import LoginIcon from '../../components/LoginIcon/LoginIcon';
import Name from '../../components/Name/Name';
import './MainPage.scss';
import { auth, database } from '../../main';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, doc } from 'firebase/firestore';
import { IFirebase } from '../../types/IFirebase';
import deafultAvatar from '../../images/defaultAvatar.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { createNewUser, setUserUpdate } from '../../api/FirebaseApi';

const MainPage = () => {
   const { nickname } = useParams();

   const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
   const [user, loadingUser, errorUser] = useAuthState(auth);

   const [isYourProfile, setIsYourProfile] = useState(false);

   useEffect(() => {
      if (value) {
         setUserUpdate({
            ...value,
            watchers: value.watchers + 1,
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [loading]);

   // Check on your account
   useEffect(() => {
      setIsYourProfile(nickname === user?.uid);
   }, [user, nickname]);

   return (
      <div className='main'>
         <div className='_Container'>
            <div className='main_body'>
               <Header />

               <div className='main_padding'>
                  {(loading || loadingUser) && <Loader />}
                  {(error || errorUser) && !(loading || loadingUser) && <div className='other-text'>Что-то пошло не так.</div>}

                  {!value && isYourProfile && !(loading || loadingUser) && (
                     // If you are logginng, but have no profile
                     <button className='buttons' onClick={async () => await createNewUser(user!)}>
                        {/*just isYourProfile check on undefined user*/}
                        Создать свой профиль
                     </button>
                  )}

                  {!value && !isYourProfile && !(loading || loadingUser) && <div className='other-text'>Этого пользователя не существует.</div>}

                  {value && !(loading || loadingUser) && (
                     // If you are logginng, but have profile
                     <>
                        <div className='main_info'>
                           <Avatar imageUrl={value.imageUrl ? value.imageUrl : deafultAvatar} socialUrl={value.socialUrl} />
                           <Name name={value.name} />
                           <About about={value.about} />
                           <div className='other-text'>Просмотрено раз: {value.watchers}</div>
                        </div>
                        <Blocks blocks={value.blocks} isYourProfile={isYourProfile} value={value} />
                     </>
                  )}
               </div>
            </div>
         </div>

         <LoginIcon />
      </div>
   );
};

export default MainPage;
