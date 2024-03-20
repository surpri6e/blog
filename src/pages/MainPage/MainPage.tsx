import { useAuthState } from 'react-firebase-hooks/auth';
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
import { doc } from 'firebase/firestore';

const MainPage = () => {
    const { nickname } = useParams();
    const [user, loading, error] = useAuthState(auth);

    //const [value, ,] = useDocumentData(doc(database, 'users', user?.displayName ? user.displayName : user?.uid ? user?.uid : ''));
    const [value, ,] = useDocumentData(doc(database, 'cities', 'LA'));

    console.log(nickname);
    console.log(value);

    // iF NO NICKNAME IN PROFILE RETURN WHAT THIS USER DOES NOT EXIST

    if (loading) {
        <Loader />;
    }

    if (error) {
        throw new Error(error.message);
    }

    return (
        <div className='main'>
            <div className='_Container'>
                <div className='main_body'>
                    <Header />
                    <div className='main_info'>
                        <Avatar imageUrl={''} />
                        <Name name='Данила' />
                        <About about='я гей' />
                    </div>
                    <Blocks />
                </div>
            </div>
            <LoginIcon />
        </div>
    );
};

export default MainPage;
