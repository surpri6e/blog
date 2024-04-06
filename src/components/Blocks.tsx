import { FC, useEffect, useState } from 'react';
import { IBlock, IFirebase } from '../types/IFirebase';
import Block from './Block/Block';
import '../styles/libs/Blocks.scss';
import { setUserUpdate } from '../api/FirebaseApi';
import { dateFormatter } from '../utils/dateFormatter';
import { Timestamp } from 'firebase/firestore';
import HelpWindow from './HelpWindow/HelpWindow';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { formatBytesToBytes } from 'bytes-transform';
import { ref } from 'firebase/storage';
import { storage } from '../main';
import { configFirebase } from '../config';

interface IBlocks {
   blocks: IBlock[];
   isYourProfile: boolean;
   value: IFirebase;
}

const Blocks: FC<IBlocks> = ({ blocks, isYourProfile, value }) => {
   const [isPressed, setIsPressed] = useState(false);

   const [message, setMessage] = useState('');

   const [title, setTitle] = useState('');
   const [isTitleError, setIsTitleError] = useState(false);

   const [uploadFile] = useUploadFile();

   const [photo, setPhoto] = useState<File>();
   const [isPhotoError, setIsPhotoError] = useState(false);

   useEffect(() => {
      if ((photo && photo.size > formatBytesToBytes(3, 'MB')) || (photo && photo.type != 'image/png' && photo.type != 'image/jpeg')) {
         setIsPhotoError(true);
      } else {
         setIsPhotoError(false);
      }
   }, [photo]);

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
                     image={elem.image}
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

                  {isTitleError && <HelpWindow title='Нужно больше 3 символов' />}
                  <input type='text' className='inputs' placeholder='О чем пост...' value={title} onChange={(e) => setTitle(e.target.value)} />
               </div>

               <div className='blocks_item'>
                  <div className='create_text'>Фотография:</div>

                  {isPhotoError && <HelpWindow title='Проверьте тип файла и его размер' />}
                  <input
                     type='file'
                     className='inputs blocks_photo'
                     onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : undefined;
                        setPhoto(file);
                     }}
                  />
               </div>

               <div className='blocks_item'>
                  <div className='create_text'>Содержимое:</div>
                  <textarea className='blocks_message inputs' placeholder='Распиши подробнее...' value={message} onChange={(e) => setMessage(e.target.value)} />
               </div>

               <div className='blocks_buttons'>
                  <button className='buttons buttons--red' onClick={() => setIsPressed(false)}>
                     Выйти
                  </button>

                  <button
                     className='buttons buttons--green'
                     // Create new block from title and message state
                     onClick={async () => {
                        if (!(title.length > 3)) {
                           setIsTitleError(true);
                           setTimeout(() => {
                              setIsTitleError(false);
                           }, 2000);
                        }

                        if (title.length > 3 && !isPhotoError) {
                           const dateNow = Date.now();

                           if (photo) {
                              await uploadFile(ref(storage, `${value.uid}/${dateNow}.png`), photo, {
                                 contentType: 'image/png',
                              });
                              await setUserUpdate({
                                 ...value,
                                 blocks: [
                                    ...blocks,
                                    {
                                       title,
                                       message,
                                       date: dateFormatter(new Date(Timestamp.now().seconds * 1000)),
                                       isFixed: false,
                                       isPrivate: false,
                                       image: `https://firebasestorage.googleapis.com/v0/b/${configFirebase.storageBucket}/o/${value.uid}%2F${dateNow}.png?alt=media`,
                                    },
                                 ],
                              });
                           } else {
                              await setUserUpdate({
                                 ...value,
                                 blocks: [
                                    ...blocks,
                                    { title, message, date: dateFormatter(new Date(Timestamp.now().seconds * 1000)), isFixed: false, isPrivate: false },
                                 ],
                              });
                           }

                           setIsPressed(false);

                           setTitle('');
                           setMessage('');
                           setPhoto(undefined);
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
