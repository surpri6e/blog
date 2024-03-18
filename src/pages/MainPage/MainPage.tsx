import About from '../../components/About/About';
import Avatar from '../../components/Avatar/Avatar';
import Blocks from '../../components/Blocks';
import IsMe from '../../components/IsMe/IsMe';
import Name from '../../components/Name/Name';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div className='main'>
            <div className='_Container'>
                <div className='main_body'>
                    <div className='main_info'>
                        <Avatar />
                        <Name />
                        <About />
                    </div>
                    <Blocks />
                </div>
            </div>
            <IsMe />
        </div>
    );
};

export default MainPage;
