import { FC } from 'react';
import './Avatar.scss';
import { IAvatar } from '../../types/IFirebase';

const Avatar: FC<IAvatar> = ({ imageUrl, socialUrl }) => {
   return (
      <a target='_blank' href={socialUrl}>
         <img src={imageUrl} alt='Avatar' className='avatar' />
      </a>
   );
};

export default Avatar;
