import Block from './Block/Block';

const Blocks = () => {
    return (
        <div className='blocks'>
            <Block title='Читать' date='12:12:12' message={'твари'} />
            <Block title='Что тут такое?' date='12:12:12' message={'суки'} />
            <Block title='Сделать брэйкпоинты для контэйнера' date='12:12:12' message={'суки'} />
        </div>
    );
};

export default Blocks;
