import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import './Header.scss';
import { auth, database } from '../../main';
import { Link, useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { IFirebase } from '../../types/IFirebase';
import { DocumentReference, doc } from 'firebase/firestore';
import FixedMessages from '../FixedMessages/FixedMessages';

const Header = () => {
    const { nickname } = useParams();
    const [value, loading, error] = useDocumentData<IFirebase>(doc(database, 'users', nickname ? nickname : ' ') as DocumentReference<IFirebase>);
    const [user, loadingUser, errorUser] = useAuthState(auth);

    const [signOut, , errorSignOut] = useSignOut(auth);

    // при нажатии на закрепленное сообщение в хеадере долэно вести к этому посту

    /*
    {blocks.map((elem, ind) => {
        if (elem.isFixed) {
            return (
                <a href={`/a/${name}/#anchor-${ind}`} key={ind}>
                    mes
                </a>
            );
        }
    })} сделать тут и передавать в закрепленки уже новый массив 
    */

    return (
        <div className='header'>
            <div className='_Container'>
                <div className='header_body'>
                    {error || errorUser || errorSignOut ? (
                        <></>
                    ) : (
                        <>
                            <div className='header_left'>
                                {loading || loadingUser ? (
                                    <></>
                                ) : value && value.blocks.length > 0 ? (
                                    <FixedMessages blocks={value.blocks} name={value.name} />
                                ) : (
                                    <div className='other-text'>Нет закрепленных сообщений.</div>
                                )}
                            </div>
                            <div className='header_right'>
                                {loadingUser ? (
                                    <></>
                                ) : !user ? (
                                    <Link to={'/login'} className='buttons'>
                                        Войти
                                    </Link>
                                ) : (
                                    <>
                                        <Link to={`/a/${user?.displayName ? user.displayName : user.uid}`} className='buttons'>
                                            Профиль
                                        </Link>
                                        {value ? (
                                            <Link to={'/settings'} className='buttons'>
                                                Настройки
                                            </Link>
                                        ) : (
                                            <></>
                                        )}

                                        <button onClick={() => signOut()} className='buttons'>
                                            Выйти
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
