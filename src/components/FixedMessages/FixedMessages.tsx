import { FC } from 'react';
import { IBlock } from '../../types/IFirebase';
import './FixedMessages.scss';
import { Link } from 'react-router-dom';

interface IFixedMessages {
    blocks: IBlock[];
    name: string;
}

const FixedMessages: FC<IFixedMessages> = ({ blocks, name }) => {
    return (
        <>
            {blocks.map((elem, ind) => {
                if (elem.isFixed) {
                    return (
                        // /a/${name}/
                        <a href={`#anchor-${ind}`} key={ind}>
                            mes
                        </a>
                    );
                }
            })}
        </>
    );
};

export default FixedMessages;
