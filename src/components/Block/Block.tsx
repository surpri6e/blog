import { FC } from 'react';
import './Block.scss';

interface IBlock {
    title: string;
    date: string;
    message: string;
}

const Block: FC<IBlock> = ({ title, date, message }) => {
    return (
        <div className='block'>
            <div className='block_header'>
                <div className='block_title'>{title}</div>
                <div className='block_date'>{date}</div>
            </div>
            <div className='block_message'>{message}</div>
        </div>
    );
};

export default Block;
