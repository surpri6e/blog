import { Link } from 'react-router-dom';
import './NothingPage.scss';

const NothingPage = () => {
   return (
      <div className='nothing'>
         <div className='_Container'>
            <div className='nothing_body'>
               <div className='other-text'>
                  Этой страницы не существует. <Link to={'/a/guUkSZJoq4ZP3ebzndmXct9m4f73'}>Профиль создателя</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NothingPage;
