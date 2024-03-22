import { FC } from 'react';
import { IBlock } from '../../types/IFirebase';
import './FixedMessages.scss';

interface IFixedMessages {
    blocks: IBlock[];
}

const FixedMessages: FC<IFixedMessages> = ({ blocks }) => {
    return <>{blocks.map((elem) => (elem.isFixed ? <a href={`#${elem.title}`}>mes</a> : <></>))}</>;
};

export default FixedMessages;
