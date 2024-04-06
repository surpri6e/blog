import { Link } from 'react-router-dom';
import './NothingPage.scss';
import { linkOfCreator } from '../../constants';

const NothingPage = () => {
   return (
      <div className='nothing'>
         <div className='_Container'>
            <div className='nothing_body'>
               <div className='other-text'>
                  Этой страницы не существует. <Link to={linkOfCreator}>Профиль создателя</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NothingPage;
