import { useAuthState } from 'react-firebase-hooks/auth';
import { IFirebase } from '../../types/IFirebase';
import './SettingsPage.scss';
import { auth, database } from '../../main';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, doc } from 'firebase/firestore';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserUpdate } from '../../api/FirebaseApi';
import HelpWindow from '../../components/HelpWindow/HelpWindow';
import { isLink } from '../../utils/isLink';

const SettingsPage = () => {
    const [user, loadingUser, errorUser] = useAuthState(auth);
    const [value, loading, error] = useDocumentData<IFirebase>(
        doc(database, 'users', user?.displayName ? user.displayName : user?.uid ? user.uid : ' ') as DocumentReference<IFirebase>,
    );

    const navigate = useNavigate();

    const [socialUrl, setSocialUrl] = useState('');
    const [about, setAbout] = useState('');

    const [isLinkError, setIsLinkError] = useState(false);

    useEffect(() => {
        setSocialUrl(value?.socialUrl ? value.socialUrl : '');
        setAbout(value?.about ? value.about : '');
    }, [value]);

    return (
        <div className='settings'>
            <div className='_Container'>
                <div className='settings_body'>
                    <div className='settings_forms'>
                        {loadingUser || loading ? (
                            <Loader />
                        ) : error || errorUser ? (
                            <div className='other-text'>Что-то пошло не так.</div>
                        ) : user && value ? (
                            <>
                                <div className='settings_block'>
                                    <div className='create_text'>Социальная ссылка:</div>
                                    {isLinkError ? <HelpWindow title='Это не ссылка' /> : <></>}
                                    <input
                                        type='text'
                                        value={socialUrl}
                                        className='inputs'
                                        onChange={(e) => setSocialUrl(e.target.value)}
                                        placeholder='https://www.com'
                                    />
                                </div>
                                <div className='settings_block'>
                                    <div className='create_text'>О себе:</div>
                                    <textarea
                                        value={about}
                                        className='inputs settings_about'
                                        onChange={(e) => setAbout(e.target.value)}
                                        placeholder='Напиши о себе'
                                    />
                                </div>
                                <div className='settings_buttons'>
                                    <Link to={`/a/${user?.displayName ? user.displayName : user.uid}`} className='buttons buttons--red'>
                                        Отклонить
                                    </Link>
                                    <button
                                        className='buttons buttons--green'
                                        onClick={async () => {
                                            if (isLink(socialUrl)) {
                                                await setUserUpdate({ ...value, socialUrl, about });
                                                navigate(`/a/${user.displayName ? user.displayName : user.uid}`);
                                            } else {
                                                setIsLinkError(true);
                                                setTimeout(() => {
                                                    setIsLinkError(false);
                                                }, 2000);
                                            }
                                        }}
                                    >
                                        Подтвердить
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='other-text'>Ваш профиль еще не создан.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
