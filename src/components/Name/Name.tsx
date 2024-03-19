import { FC } from 'react';
import './Name.scss';
import { IName } from '../../types/IFirebase';

const Name: FC<IName> = ({ name }) => {
    return <div className='name'>{name} ведет свой блог!</div>;
};

export default Name;
