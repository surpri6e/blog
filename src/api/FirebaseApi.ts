import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { database } from '../main';
import { dateFormatter } from '../utils/dateFormatter';
import { User } from 'firebase/auth';
import { IFirebase } from '../types/IFirebase';

/**  Create new user */
export const createNewUser = async (user: User) => {
   const newUser: IFirebase = {
      about: 'Новый пользователь.',
      name: user.displayName ? user.displayName : user.uid,
      imageUrl: user.photoURL ? user.photoURL : '',
      socialUrl: '#',
      blocks: [{ title: 'Новый блок', date: dateFormatter(new Date(Timestamp.now().seconds * 1000)), message: 'Хи-хи)', isFixed: true }],
   };

   await setDoc(doc(database, 'users', user.displayName ? user.displayName : user.uid), newUser);
};

/**  Update data of user */
export const setUserUpdate = async (data: IFirebase) => {
   await setDoc(doc(database, 'users', data.name), data);
};
