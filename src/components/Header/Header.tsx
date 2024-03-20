import { useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth } from '../../main';

const Header = () => {
    const [signOut] = useSignOut(auth);

    //typed

    return (
        <div className='header'>
            <div className='header_left'></div>
            <div className='header_right'>
                <button onClick={() => signOut()}>Sigh out</button>
            </div>
        </div>
    );
};

export default Header;
