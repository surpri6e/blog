import { FC } from 'react';
import './Block.scss';
import { IBlock, IFirebase } from '../../types/IFirebase';
import BlockTools from '../BlockTools/BlockTools';

interface IBlockTools {
    value: IFirebase;
    isYourProfile: boolean;
    ind: number;
}

const Block: FC<IBlock & IBlockTools> = ({ title, date, message, isFixed, value, isYourProfile, ind }) => {
    return (
        <div className='block' id={`${isFixed ? `anchor-${ind}` : ''}`}>
            {isYourProfile ? <BlockTools ind={ind} value={value} /> : <></>}
            <div className='block_header'>
                <a className='block_title'>{title}</a>
                <div className='block_info'>
                    <div className='block_info_text'>[{date}]</div>
                    {isFixed ? <div className='block_info_text'>Закрепленное сообщение.</div> : <></>}
                </div>
            </div>
            <div className='block_message'>
                <b>({title}) </b>
                {message}
            </div>
        </div>
    );
};

export default Block;
