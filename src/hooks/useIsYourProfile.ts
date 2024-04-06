import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

type useIsYourProfileSignature = (nickname: string | undefined, user: User | null | undefined) => boolean;

/** Check on your account */
export const useIsYourProfile: useIsYourProfileSignature = (nickname, user) => {
   const [isYourProfile, setIsYourProfile] = useState(false);

   useEffect(() => {
      setIsYourProfile(nickname === user?.uid);
   }, [user, nickname]);

   return isYourProfile;
};
