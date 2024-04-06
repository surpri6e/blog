import './LoginPage.scss';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../main';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { linkOfCreator } from '../../constants';

const LoginPage = () => {
   const [login, , loading, error] = useSignInWithGoogle(auth);
   const { loadingUser, errorUser } = useContext(AuthContext);

   const navigate = useNavigate();

   return (
      <div className='login'>
         <div className='_Container'>
            <div className='login_body'>
               <div className='login_form'>
                  {(loading || loadingUser) && <Loader />}

                  {(error || errorUser) && !(loading || loadingUser) && <div className='other-text'>Что-то пошло не так.</div>}

                  {!(error || errorUser) && !(loading || loadingUser) && (
                     <>
                        <div className='login_form_title'>Способы входа:</div>
                        <button
                           // Logging with Google API
                           className='buttons'
                           onClick={async () => {
                              await login();
                              navigate(linkOfCreator);
                           }}
                        >
                           Продолжить с Гугл
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
