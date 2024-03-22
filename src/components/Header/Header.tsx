import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth, database } from '../../main';
import { Link, useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IFirebase } from '../../types/IFirebase';
import { DocumentReference, doc } from 'firebase/firestore';

const Header = () => {
    const { nickname } = useParams();
    const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
    const [user, loadingUser, errorUser] = useAuthState(auth);

    const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

    //typed

    // button of create profile on main page

    //header -> 3 buttions and fixed messages and settings. ALL!!

    // button of create profile on main page
    // just do page with settings name about and other

    // start new blocks

    // при нажатии на закрепленное сообщение в хеадере долэно вести к этому посту

    //loading handler and error

    // if fixed messages is empty

    // если пррофиль не создан, не долэжно быть меню настроект, проверка value

    return (
        <div className='header'>
            <div className='header_left'>Fixed messages</div>
            <div className='header_right'>
                {loadingUser ? (
                    <></>
                ) : !user ? (
                    <Link to={'/login'} className='buttons'>
                        Login
                    </Link>
                ) : (
                    <>
                        <Link to={`/a/${user?.displayName ? user.displayName : user.uid}`} className='buttons'>
                            Profile
                        </Link>
                        <Link to={'/settings'} className='buttons'>
                            Settings
                        </Link>

                        <button onClick={() => signOut()} className='buttons'>
                            Sigh out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
