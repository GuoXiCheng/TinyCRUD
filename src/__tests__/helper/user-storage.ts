import { GiteeStorage } from '../..';
import { GITEE_NUMBER, giteeRequest } from './helper';
import { UserModel } from './user-model';

export class UserStorage extends GiteeStorage<UserModel> {
    private static instance: UserStorage;
    private constructor() {
        super(giteeRequest, GITEE_NUMBER);
    }

    public static getInstance(): UserStorage {
        if (!UserStorage.instance) {
            UserStorage.instance = new UserStorage();
        }
        return UserStorage.instance;
    }
    
}

export const User = UserStorage.getInstance();