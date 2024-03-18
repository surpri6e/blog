import Avatar from './components/Avatar/Avatar';
import './styles/styles.scss';
import './App.scss';
import Name from './components/Name/Name';
import Blocks from './components/Blocks';
import IsMe from './components/IsMe/IsMe';

function App() {
    return (
        <div className='content'>
            <div className='_Container'>
                <div className='content_body'>
                    <div className='info'>
                        {/* do content_info, and block with detail information about me, my books and developting */}
                        <Avatar />
                        <Name />
                    </div>
                    <Blocks />
                </div>
            </div>
            <IsMe />
        </div>
    );
}

export default App;
