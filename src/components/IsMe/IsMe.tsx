import { Link } from 'react-router-dom';
import './IsMe.scss';

const IsMe = () => {
    return (
        <Link to={'/me'} className='isme'>
            Me
        </Link>
    );
};

export default IsMe;
