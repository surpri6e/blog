import { FC } from 'react';
import './Block.scss';
import { IBlock, IFirebase } from '../../types/IFirebase';
import BlockTools from '../BlockTools/BlockTools';

interface IBlockTools {
   value: IFirebase;
   isYourProfile: boolean;
   ind: number;
}

const Block: FC<IBlock & IBlockTools> = ({ title, date, message, isFixed, isPrivate, value, isYourProfile, ind }) => {
   return isYourProfile ? (
      <div className='block' id={`${isFixed ? `anchor-${ind}` : ''}`}>
         {isYourProfile && <BlockTools ind={ind} value={value} />}

         <div className='block_header'>
            <a className='block_title'>{title}</a>
            <div className='block_info'>
               <div className='block_info_text'>[{date}]</div>
               {isFixed && <div className='block_info_text'>Закреп.</div>}
               {isPrivate && <div className='block_info_text'>Приват.</div>}
            </div>
         </div>

         <div className='block_message'>
            <b>({title}) </b>
            {message}
         </div>
      </div>
   ) : !isYourProfile && isPrivate ? (
      <></>
   ) : (
      <div className='block' id={`${isFixed ? `anchor-${ind}` : ''}`}>
         {isYourProfile && <BlockTools ind={ind} value={value} />}

         <div className='block_header'>
            <a className='block_title'>{title}</a>
            <div className='block_info'>
               <div className='block_info_text'>[{date}]</div>
               {isFixed && <div className='block_info_text'>Закреп.</div>}
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
