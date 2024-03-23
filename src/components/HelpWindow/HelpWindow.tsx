import { FC } from 'react';
import './HelpWindow.scss';

interface IHelpWindow {
   title: string;
}

const HelpWindow: FC<IHelpWindow> = ({ title }) => {
   return <div className='help-window'>{title}</div>;
};

export default HelpWindow;
