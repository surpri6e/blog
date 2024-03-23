import { IBlock } from '../types/IFirebase';
import { IFixMessage } from '../types/IFixMessage';

export function fixMessages(data: IBlock[]): IFixMessage[] {
    const result: IFixMessage[] = [];
    data.filter((elem, ind) => {
        if (elem.isFixed) {
            result.push({ indexForLink: ind, titleOfBlock: elem.title });
        }
        return elem.isFixed;
    });
    return result;
}
