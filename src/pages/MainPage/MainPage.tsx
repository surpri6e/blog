import About from '../../components/About/About';
import Avatar from '../../components/Avatar/Avatar';
import Blocks from '../../components/Blocks';
import LoginIcon from '../../components/LoginIcon/LoginIcon';
import Name from '../../components/Name/Name';
import './MainPage.scss';
import { database } from '../../main';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, doc } from 'firebase/firestore';
import { IFirebase } from '../../types/IFirebase';

const MainPage = () => {
    const { nickname } = useParams();
    const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);

    return (
        <div className='main'>
            <div className='_Container'>
                <div className='main_body'>
                    <Header />
                    {loading ? (
                        <Loader />
                    ) : value === undefined || error ? (
                        <div className='other-text'>This user doesn't exist.</div>
                    ) : (
                        <>
                            <div className='main_info'>
                                <Avatar imageUrl={''} /> {/*default image*/}
                                <Name name='Данила' />
                                <About about='я гей' />
                            </div>
                            <Blocks />
                        </>
                    )}
                </div>
            </div>
            <LoginIcon />
        </div>
    );
};

export default MainPage;
