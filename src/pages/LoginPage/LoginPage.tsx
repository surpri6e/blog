import './LoginPage.scss';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../main';

// сделать именно контейнер меньше а не его составляющие

const LoginPage = () => {
    const [login] = useSignInWithGoogle(auth);
    // const [login, user, loading, error] = useSignInWithGoogle(auth);

    const [user] = useAuthState(auth);
    //const [user, loading, error] = useAuthState(auth, options);
    console.log(user);
    return (
        <div className='login'>
            <div className='_Container'>
                <div className='login_body'>
                    <div className='login_form'>
                        <div className='login_form_title'>Способы входа:</div>
                        <button className='login_form_button' onClick={() => login()}>
                            Продолжить с Гугл
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
