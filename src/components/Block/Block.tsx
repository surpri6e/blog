import { FC } from 'react';
import './Block.scss';
import { IBlock } from '../../types/IFirebase';

const Block: FC<IBlock> = ({ title, date, message, isFixed }) => {
    return (
        <div className='block' id={`${isFixed ? `anchor-${title}` : ''}`}>
            <div className='block_header'>
                <a className='block_title'>{title}</a>
                <div className='block_info'>
                    <div className='block_info_text'>[{date}]</div>
                    {isFixed ? <div className='block_info_text'>Закрепленное сообщение.</div> : <></>}
                </div>
            </div>
            <div className='block_message'>{message}</div>
        </div>
    );
};

export default Block;
