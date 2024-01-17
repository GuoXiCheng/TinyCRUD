import dayjs from "dayjs";
import { PlainObject } from "../index";
import { UserModel } from "./helper/user-model";
import { User } from "./helper/user-repository";
import { setupGiteeMock } from "./mock/mock-gitee-api";
import { USE_API } from "./helper/helper";


describe('Test User Repository', () => {
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
    
    beforeAll(async ()=>{   
        if (USE_API) {
            await User.deleteAll();
        } else {
            setupGiteeMock();
        }
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
        expect(findByIdResult.created_by).not.toBeNull();
        expect(typeof findByIdResult.created_by.user_id).toBe('number');
        expect(typeof findByIdResult.created_by.username).toBe('string');
        expect(typeof findByIdResult.created_by.avatar_url).toBe('string');
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

    (USE_API ? test: test.skip)('Test createAll User', async () => {
        await User.deleteAll();
        const result = await User.createAll(userList);
        expect(result.length).toEqual(10);

        // 因为是并行创建，所以批量新增的数据是无序的
        expect((await User.find()).map(item => item.name)).not.toEqual(userList.map(item => item.name));
    });

    test('Test createAll User orderly', async () => {
        await User.deleteAll();
        const result = await User.createAll(userList, true);
        expect(result.length).toEqual(10);

        // 因为是顺序创建，所以批量新增的数据是有序的
        expect((await User.find()).map(item => item.name)).toEqual(userList.map(item => item.name));
    });

    test('Test find user with params since', async () => {
        const time = dayjs().subtract(3, 'second').format();
        const result = await User.find({ since: time });
        expect(result.length).toBeGreaterThan(0);
        result.forEach(item => {
            expect(dayjs(item.created_at).isAfter(time)).toBeTruthy();
        });
    });

    test('Test find user with params order', async () => {
        const resultDesc = await User.find({ order: 'desc' });
        expect(resultDesc.map(item => item.name)).toEqual(userList.map(item => item.name).reverse());

        const resultAsc = await User.find({ order: 'asc' });
        expect(resultAsc.map(item => item.name)).toEqual(userList.map(item => item.name));
    });

    test('Test find user with params page & per_page', async () => {
        const firstPage = await User.find({ page: 1, per_page: 3 });
        expect(firstPage.length).toEqual(3);

        const lastPage = await User.find({ page: 4, per_page: 3 });
        expect(lastPage.length).toEqual(1);
    });

    test('Test get User Detail', async()=>{
        const result = await User.detail();
        const {id, issue_number, comments, created_at, updated_at} = result;
        expect(id).not.toBeNull();
        expect(issue_number).not.toBeNull();
        expect(comments).not.toBeNull();
        expect(created_at).not.toBeNull();
        expect(updated_at).not.toBeNull();
    });
});