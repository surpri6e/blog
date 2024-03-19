import { FC } from 'react';
import './About.scss';
import { IAbout } from '../../types/IFirebase';

const About: FC<IAbout> = ({ about }) => {
    return <div className='about'>{about}</div>;
};

export default About;
