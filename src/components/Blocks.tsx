import { FC, useState } from 'react';
import { IBlock, IFirebase } from '../types/IFirebase';
import Block from './Block/Block';
import '../styles/libs/Blocks.scss';
import { setUserUpdate } from '../api/FirebaseApi';
import { dateFormatter } from '../utils/dateFormatter';
import { Timestamp } from 'firebase/firestore';
import HelpWindow from './HelpWindow/HelpWindow';

interface IBlocks {
   blocks: IBlock[];
   isYourProfile: boolean;
   value: IFirebase;
}

const Blocks: FC<IBlocks> = ({ blocks, isYourProfile, value }) => {
   const [isPressed, setIsPressed] = useState(false);

   const [title, setTitle] = useState('');
   const [message, setMessage] = useState('');

   const [isLinkError, setIsLinkError] = useState(false);

   return (
      <>
         <div className='blocks'>
            {/* Shows blocks */}
            {blocks.length > 0 &&
               blocks.map((elem, ind) => (
                  <Block
                     title={elem.title}
                     message={elem.message}
                     date={elem.date}
                     isFixed={elem.isFixed}
                     isPrivate={elem.isPrivate}
                     isYourProfile={isYourProfile}
                     value={value}
                     ind={ind}
                     key={ind}
                  />
               ))}

            {isYourProfile && blocks.length === 0 && <div className='other-text other-text--center'>Постов тут нет</div>}
            {!isYourProfile && blocks.length === blocks.filter((elem) => elem.isPrivate).length && (
               <div className='other-text other-text--center'>Постов тут нет</div>
            )}
         </div>

         {/* Logic of create new block */}
         {!isPressed && isYourProfile && (
            <div className='blocks_form'>
               <button className='buttons' onClick={() => setIsPressed(true)}>
                  Создать новый пост
               </button>
            </div>
         )}

         {isPressed && isYourProfile && (
            <div className='blocks_form'>
               <div className='blocks_item'>
                  <div className='create_text'>Название поста:</div>
                  {isLinkError && <HelpWindow title='Нужно больше 3 символов' />}

                  <input type='text' className='inputs--width' placeholder='О чем пост...' value={title} onChange={(e) => setTitle(e.target.value)} />
               </div>

               <div className='blocks_item'>
                  <div className='create_text'>Содержимое:</div>
                  <textarea
                     className='blocks_message inputs--width'
                     placeholder='Распиши подробнее...'
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />
               </div>

               <div className='blocks_buttons'>
                  <button className='buttons buttons--red' onClick={() => setIsPressed(false)}>
                     Выйти
                  </button>

                  <button
                     className='buttons buttons--green'
                     // Create new block from title and message state
                     onClick={async () => {
                        if (title.length > 3) {
                           await setUserUpdate({
                              ...value,
                              blocks: [
                                 ...blocks,
                                 { title, message, date: dateFormatter(new Date(Timestamp.now().seconds * 1000)), isFixed: false, isPrivate: false },
                              ],
                           });
                           setIsPressed(false);
                           setTitle('');
                           setMessage('');
                        } else {
                           setIsLinkError(true);
                           setTimeout(() => {
                              setIsLinkError(false);
                           }, 2000);
                        }
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
