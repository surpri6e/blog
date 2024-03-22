import { useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth, database } from '../../main';
import { useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IFirebase } from '../../types/IFirebase';
import { DocumentReference, doc } from 'firebase/firestore';

const Header = () => {
    const { nickname } = useParams();
    const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);

    const [signOut] = useSignOut(auth);

    //typed

    // button of create profile on main page

    //header -> 3 buttions and fixed messages and settings. ALL!!

    // button of create profile on main page
    // just do page with settings name about and other

    // start new blocks

    return (
        <div className='header'>
            <div className='header_left'>Fixed messages</div>
            <div className='header_right'>
                <button onClick={() => signOut()}>Sigh out</button>
                <button onClick={() => signOut()}>Profile</button>
                <button onClick={() => signOut()}>Settings</button>
            </div>
        </div>
    );
};

export default Header;
