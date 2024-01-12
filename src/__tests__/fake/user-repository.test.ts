import { User } from "../helper/user-repository";
import { initGiteeJSONFile, mockGiteeCreate, mockGiteeFind, mockGiteeFindById } from "../mock/mock-gitee-api";

describe('Test Fake User Repository', () => {
    beforeAll(async ()=>{
        await initGiteeJSONFile();
    });

    test('Test find User', async () => {
        await mockGiteeFind();
        const detail = await User.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById User', async () => {
        await mockGiteeCreate();
        await User.create({
            name: 'test-user',
            age: 18
        });

        await mockGiteeFind();
        const findResult = await User.find();
        expect(findResult.length).toEqual(1);

        await mockGiteeFindById(findResult[0].id);
        const findByIdResult = await User.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
        expect(findByIdResult.created_by).not.toBeNull();
        expect(typeof findByIdResult.created_by.user_id).toBe('number');
        expect(typeof findByIdResult.created_by.username).toBe('string');
        expect(typeof findByIdResult.created_by.avatar_url).toBe('string');
    });
});