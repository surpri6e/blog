import { Link } from 'react-router-dom';
import './LoginIcon.scss';

const IsMe = () => {
    return (
        <Link to={'/login'} className='login-icon'>
            Я
        </Link>
    );
};

export default IsMe;
