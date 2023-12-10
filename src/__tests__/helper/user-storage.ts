import { GiteeStorage } from '../../storage-lib/gitee/gitee-storage';
import { GiteeStorageOptions } from '../../storage-lib/gitee/gitee-storage-options';

export class UserStorage extends GiteeStorage {
    constructor(options: GiteeStorageOptions) {
        super(options);
    }
}