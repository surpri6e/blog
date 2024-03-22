import { FC } from 'react';
import { IBlock } from '../types/IFirebase';
import Block from './Block/Block';

interface IBlocks {
    blocks: IBlock[];
}

const Blocks: FC<IBlocks> = ({ blocks }) => {
    return (
        <div className='blocks'>
            {blocks.length != 0 ? (
                blocks.map((elem, ind) => <Block title={elem.title} message={elem.message} date={elem.date} isFixed={elem.isFixed} key={ind} />)
            ) : (
                <div className='other-text'>Постов тут нет:{'('}</div>
            )}
        </div>
    );
};

export default Blocks;
