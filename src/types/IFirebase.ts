// API for working with database

export interface IAbout {
   about: string;
}

export interface IAvatar {
   imageUrl: string;
   socialUrl: string;
}

export interface IBlock {
   title: string;
   date: string;
   message: string;
   isFixed: boolean;
   isPrivate: boolean;
   image?: string;
}

export interface IName {
   name: string;
}

export interface IFirebase extends IAbout, IAvatar, IName {
   blocks: IBlock[];
   uid: string;
   watchers: number;
}
