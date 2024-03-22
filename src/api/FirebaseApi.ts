import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { database } from '../main';
import { dateFormatter } from '../utils/dateFormatter';
import { User } from 'firebase/auth';
import { IFirebase } from '../types/IFirebase';

export const createNewUser = async (user: User) => {
    const newUser: IFirebase = {
        about: 'New user.',
        name: user.displayName ? user.displayName : user.uid,
        imageUrl: user.photoURL ? user.photoURL : '',
        socialUrl: '#',
        blocks: [{ title: 'New block', date: dateFormatter(new Date(Timestamp.now().seconds * 1000)), message: 'heh))', isFixed: true }],
    };
    await setDoc(doc(database, 'users', user.displayName ? user.displayName : user.uid), newUser);
};

export const setUserUpdate = async (data: IFirebase) => {
    await setDoc(doc(database, 'users', data.name), data);
};
