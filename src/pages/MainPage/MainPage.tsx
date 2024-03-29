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
import { createNewUser } from '../../api/FirebaseApi';

const MainPage = () => {
   const { nickname } = useParams();
   const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
   const [user, loadingUser, errorUser] = useAuthState(auth);

   const [isYourProfile, setIsYourProfile] = useState(false);

   // Check on your account
   useEffect(() => {
      setIsYourProfile(nickname === user?.displayName ? true : nickname === user?.uid ? true : false);
   }, [user, nickname]);

   return (
      <div className='main'>
         <div className='_Container'>
            <div className='main_body'>
               <Header />
               {loading || loadingUser ? (
                  <Loader />
               ) : error || errorUser ? (
                  // Handle error
                  <div className='main_padding'>
                     <div className='other-text'>Что-то пошло не так.</div>
                  </div>
               ) : value === undefined && isYourProfile ? (
                  // If you are logginng, but have no profile
                  <div className='main_padding'>
                     <button className='buttons' onClick={async () => await createNewUser(user!)}>
                        {/*just isYourProfile check on undefined user*/}
                        Создать свой профиль
                     </button>
                  </div>
               ) : value ? (
                  // If you are logginng, but have profile
                  <>
                     <div className='main_info main_padding'>
                        <Avatar imageUrl={value.imageUrl ? value.imageUrl : deafultAvatar} socialUrl={value.socialUrl} />
                        <Name name={value.name} />
                        <About about={value.about} />
                     </div>
                     <Blocks blocks={value.blocks} isYourProfile={isYourProfile} value={value} />
                  </>
               ) : (
                  <div className='main_padding'>
                     <div className='other-text'>Этого пользователя не существует.</div>
                  </div>
               )}
            </div>
         </div>
         <LoginIcon />
      </div>
   );
};

export default MainPage;
