import { FC, useState } from 'react';
import './BlockTools.scss';
import { IFirebase } from '../../types/IFirebase';
import { setUserUpdate } from '../../api/FirebaseApi';

interface IBlockTools {
   value: IFirebase;
   ind: number;
}

const BlockTools: FC<IBlockTools> = ({ value, ind }) => {
   const [isWantDelete, setIsWantDelete] = useState<boolean>(false);

   return isWantDelete ? (
      <div className='block-tools'>
         <div
            className='buttons buttons--small'
            onClick={async () => {
               value.blocks.splice(ind, 1);
               await setUserUpdate({ ...value });
               setIsWantDelete(false);
            }}
         >
            Да
         </div>
         <div className='buttons buttons--small' onClick={() => setIsWantDelete(false)}>
            Нет
         </div>
      </div>
   ) : (
      <div className='block-tools'>
         <div
            className='buttons buttons--small'
            onClick={async () => {
               value.blocks[ind] = { ...value.blocks[ind], isFixed: !value.blocks[ind].isFixed };
               await setUserUpdate({ ...value });
            }}
         >
            {value.blocks[ind].isFixed ? 'Отк.' : 'Зак.'}
         </div>

         <div className='buttons buttons--small' onClick={() => setIsWantDelete(true)}>
            Уда.
         </div>
      </div>
   );
};

export default BlockTools;
