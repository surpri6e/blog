import { FC } from 'react';
import './Block.scss';
import { IBlock } from '../../types/IFirebase';
import BlockTools from '../BlockTools/BlockTools';
import { IBlockTools } from '../../types/IBlockTools';

interface IBlockAdditional {
   isYourProfile: boolean;
}

const Block: FC<IBlock & IBlockTools & IBlockAdditional> = ({ title, date, message, isFixed, isPrivate, image, isYourProfile, ind, value }) => {
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
         <a href={image} className='block_image' target='_blank'>
            {image && <img src={image} alt='Block image' />}
         </a>
      </div>
   ) : !isYourProfile && isPrivate ? (
      <></>
   ) : (
      <div className='block' id={`${isFixed ? `anchor-${ind}` : ''}`}>
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
         <a href={image} className='block_image' target='_blank'>
            {image && <img src={image} alt='Block image' />}
         </a>
      </div>
   );
};

export default Block;
