import { FC } from 'react';
import { IBlock } from '../../types/IFirebase';
import './FixedMessages.scss';

interface IFixedMessages {
    blocks: IBlock[];
}

const FixedMessages: FC<IFixedMessages> = ({ blocks }) => {
    return (
        <>
            {blocks.map((elem, ind) =>
                elem.isFixed ? (
                    <a href={`#${elem.title}`} key={ind}>
                        mes
                    </a>
                ) : (
                    <></>
                ),
            )}
        </>
    );
};

export default FixedMessages;
