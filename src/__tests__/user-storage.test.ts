import { PlainObject } from "../storage-lib/base/plain-object";
import { UserModel } from "./helper/user-model";
import { User } from "./helper/user-storage";

describe('Test User Storage', () => {

    const userList: PlainObject<UserModel>[] = [{
        name: 'test-user-1',
        age: 18
    },
    {
        name: 'test-user-2',
        age: 20
    },
    {
        name: 'test-user-3',
        age: 22
    },
    {
        name: 'test-user-4',
        age: 24
    },
    {
        name: 'test-user-5',
        age: 26
    },
    {
        name: 'test-user-6',
        age: 28
    },
    {
        name: 'test-user-7',
        age: 30
    },
    {
        name: 'test-user-8',
        age: 32
    },
    {
        name: 'test-user-9',
        age: 34
    },
    {
        name: 'test-user-10',
        age: 36
    }];

    beforeAll(async () => {
        await User.deleteAll();
    });

    test('Test find User', async () => {
        const detail = await User.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById User', async () => {
        await User.create({
            name: 'test-user',
            age: 18
        });
        const findResult = await User.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await User.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById User', async () => {
        const findResult = await User.find();
        const updateResult = await User.updateById(findResult[0].id, {
            name: 'test-user-update',
            age: 20
        });
        const findByIdResult = await User.findById(findResult[0].id);
        expect(updateResult.name).toEqual(findByIdResult.name);
        expect(updateResult.age).toEqual(findByIdResult.age);
        expect(updateResult.id).toEqual(findByIdResult.id);
        expect(updateResult.created_at).toEqual(findByIdResult.created_at);
        expect(updateResult.updated_at).toEqual(findByIdResult.updated_at);
    });

    test('Test deleteById User failed', async () => {
        try {
            await User.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test updateById User failed', async () => {
        try {
            await User.updateById(123, {
                name: 'test-user-update',
                age: 20
            });
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test findById User failed', async () => {
        try {
            await User.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test createAll User', async () => {
        await User.deleteAll();
        const result = await User.createAll(userList);
        expect(result.length).toEqual(10);

        // 因为是并行创建，所以批量新增的数据是无序的
        expect((await User.find()).map(item=>item.name)).not.toEqual(userList.map(item=>item.name));
    });

    test('Test createAll User orderly', async () => {
        await User.deleteAll();
        const result = await User.createAll(userList, true);
        expect(result.length).toEqual(10);

        // 因为是顺序创建，所以批量新增的数据是有序的
        expect((await User.find()).map(item=>item.name)).toEqual(userList.map(item=>item.name));
    });
});