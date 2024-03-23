import { FC, useEffect, useState } from 'react';
import './FixedMessages.scss';
import { IFixMessage } from '../../types/IFixMessage';

interface IFixedMessages {
   blocks: IFixMessage[];
}

const FixedMessages: FC<IFixedMessages> = ({ blocks }) => {
   const [blockIndex, setBlockIndex] = useState(0);
   const [blocksMain, setBlocksMain] = useState(blocks);

   useEffect(() => {
      setBlockIndex(0);
      setBlocksMain(blocks);
   }, [blocksMain, blocks]);

   return (
      <div className='fixed-messages'>
         <div className='fixed-messages_text'>
            <a href={`#anchor-${blocksMain[blockIndex].indexForLink}`}>{blocksMain[blockIndex].titleOfBlock}</a>
         </div>
         <div className='fixed-messages_buttons'>
            {blockIndex === 0 ? (
               <></>
            ) : (
               <button className='buttons buttons--arrows fixed-messages_button--up' onClick={() => setBlockIndex(blockIndex - 1)}>
                  {'<'}
               </button>
            )}
            {blockIndex === blocksMain.length - 1 ? (
               <></>
            ) : (
               <button className='buttons buttons--arrows fixed-messages_button--down' onClick={() => setBlockIndex(blockIndex + 1)}>
                  {'<'}
               </button>
            )}
         </div>
      </div>
   );
};

export default FixedMessages;
