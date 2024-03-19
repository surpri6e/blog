import { FC } from 'react';
import './Block.scss';
import { IBlock } from '../../types/IFirebase';

const Block: FC<IBlock> = ({ title, date, message }) => {
    return (
        <div className='block'>
            <div className='block_header'>
                <a className='block_title'>{title}</a>
                <div className='block_date'>{date}</div>
            </div>
            <div className='block_message'>{message}</div>
        </div>
    );
};

export default Block;
