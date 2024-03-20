export interface IAbout {
    about: string;
}

export interface IAvatar {
    imageUrl: string;
}

export interface IBlock {
    title: string;
    date: string;
    message: string;
}

export interface IName {
    name: string;
}

export interface IFirebase extends IAbout, IAvatar, IName {
    blocks: IBlock[];
}
