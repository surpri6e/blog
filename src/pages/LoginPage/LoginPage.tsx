import './LoginPage.scss';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../main';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [login, , loading, error] = useSignInWithGoogle(auth);
    const [user, loadingUser, errorUser] = useAuthState(auth);

    const navigate = useNavigate();

    if (error) {
        throw new Error(error.message);
    }

    if (errorUser) {
        throw new Error(errorUser.message);
    }

    return (
        <div className='login'>
            <div className='_Container'>
                <div className='login_body'>
                    <div className='login_form'>
                        {loading || loadingUser ? (
                            <Loader />
                        ) : (
                            <>
                                <div className='login_form_title'>Способы входа:</div>
                                <button
                                    className='login_form_button'
                                    onClick={() => {
                                        login();
                                        if (!loading && user) {
                                            navigate('/');
                                            console.log(user); // HERE
                                        }
                                    }}
                                >
                                    Продолжить с Гугл
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
