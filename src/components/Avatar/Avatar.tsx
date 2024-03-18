import './Avatar.scss';
import avatar from '../../images/avatar.jpg';

const Avatar = () => {
    return (
        <a target='_blank' href='https://vk.com/surpri6e'>
            <img src={avatar} alt='Avatar' className='avatar' />
        </a>
    );
};

export default Avatar;
