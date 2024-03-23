import './BurgerMenu.scss';

const BurgerMenu = () => {
    return (
        <div className='menu'>
            <input type='checkbox' id='burger-checkbox' className='burger-checkbox' />
            <label htmlFor='burger-checkbox' className='burger'></label>
            <ul className='menu-list'>
                <li>
                    <a href='#' className='menu-item'>
                        Главная
                    </a>
                </li>
                <li>
                    <a href='#' className='menu-item'>
                        О нас
                    </a>
                </li>
                <li>
                    <a href='#' className='menu-item'>
                        Команда
                    </a>
                </li>
                <li>
                    <a href='#' className='menu-item'>
                        Контакты
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default BurgerMenu;
