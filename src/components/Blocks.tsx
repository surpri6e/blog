import { FC, useState } from 'react';
import { IBlock, IFirebase } from '../types/IFirebase';
import Block from './Block/Block';
import '../styles/libs/Blocks.scss';

interface IBlocks {
    blocks: IBlock[];
    isYourProfile: boolean;
    value: IFirebase;
}

const Blocks: FC<IBlocks> = ({ blocks }) => {
    const [isPressed, setIsPressed] = useState(false);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    // empty title and empty message + date + isFixed

    return (
        <>
            <div className='blocks'>
                {blocks.length != 0 ? (
                    blocks.map((elem, ind) => <Block title={elem.title} message={elem.message} date={elem.date} isFixed={elem.isFixed} key={ind} />)
                ) : (
                    <div className='other-text other-text--center'>Постов тут нет:{'('}</div>
                )}
            </div>
            {!isPressed ? (
                <button className='buttons' onClick={() => setIsPressed(true)}>
                    Создать новый пост
                </button>
            ) : (
                <div className='blocks_form'>
                    <div className='blocks_item'>
                        <div className='create_text'>Название поста:</div>
                        <input type='text' className='inputs' placeholder='О чем пост...' />
                    </div>
                    <div className='blocks_item'>
                        <div className='create_text'>Содержимое:</div>
                        <textarea className='inputs blocks_message' placeholder='Распиши подробнее...' />
                    </div>
                    <div className='blocks_buttons'>
                        <button className='buttons buttons--red' onClick={() => setIsPressed(false)}>
                            Выйти
                        </button>
                        <button
                            className='buttons buttons--green'
                            onClick={() => {
                                console.log(isPressed);
                                setIsPressed(false);
                            }}
                        >
                            Запостить
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Blocks;
