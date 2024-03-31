import './LoginPage.scss';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../main';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const [login, , loading, error] = useSignInWithGoogle(auth);
   const [, loadingUser, errorUser] = useAuthState(auth);

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
                              navigate('/a/guUkSZJoq4ZP3ebzndmXct9m4f73');
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
