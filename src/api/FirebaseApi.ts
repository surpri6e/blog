import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { database } from '../main';
import { dateFormatter } from '../utils/dateFormatter';
import { User } from 'firebase/auth';
import { IFirebase } from '../types/IFirebase';

export const createNewUser = async (user: User) => {
    const newUser: IFirebase = {
        about: 'New user.',
        name: user.displayName ? user.displayName : user.uid,
        imageUrl: user.photoURL ? user.photoURL : '', // Maybe default
        blocks: [{ title: 'New block', date: dateFormatter(new Date(Timestamp.now().seconds * 1000)), message: 'heh))' }],
    };
    console.log('i here');
    await setDoc(doc(database, 'users', user.displayName ? user.displayName : user.uid), newUser);
};
