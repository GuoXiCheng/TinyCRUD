import { GiteeStorage } from '../..';
import { SingletonFactory } from '../../utils';
import { GITEE_NUMBER, giteeRequest } from './helper';
import { UserModel } from './user-model';

export class UserStorage extends GiteeStorage<UserModel> {
    constructor() {
        super(giteeRequest, GITEE_NUMBER);
    }
}

/**
 * test gitee api with a user storage instance.
 */
export const User = SingletonFactory.createInstance(UserStorage);