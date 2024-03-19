import About from '../../components/About/About';
import Avatar from '../../components/Avatar/Avatar';
import Blocks from '../../components/Blocks';
import LoginIcon from '../../components/LoginIcon/LoginIcon';
import Name from '../../components/Name/Name';
import './MainPage.scss';

// TEMPORY then dfelete foled image
import avatar from '../../images/avatar.jpg';

const MainPage = () => {
    return (
        <div className='main'>
            <div className='_Container'>
                <div className='main_body'>
                    <div className='main_info'>
                        <Avatar imageUrl={avatar} socialUrl='#' />
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
