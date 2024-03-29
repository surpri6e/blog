import { Link } from 'react-router-dom';
import './LoginIcon.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../main';

const LoginIcon = () => {
   const [user, loading] = useAuthState(auth);

   return loading || user ? (
      <></>
   ) : (
      <Link to={'/login'} className='login-icon'>
         Я
      </Link>
   );
};

export default LoginIcon;
