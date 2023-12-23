import { GiteeStorage } from '../..';
import { GITEE_NUMBER, giteeRequest } from './helper';
import { UserModel } from './user-model';

export class UserStorage extends GiteeStorage<UserModel> {

    constructor() {
        super(giteeRequest, GITEE_NUMBER);
    }
    
}