import { Link } from 'react-router-dom';
import './LoginIcon.scss';
import { loginPath } from '../../constants';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginIcon = () => {
   const { user, loadingUser } = useContext(AuthContext);

   return (
      !(loadingUser || user) && (
         <Link to={loginPath} className='login-icon'>
            Я
         </Link>
      )
   );
};

export default LoginIcon;
