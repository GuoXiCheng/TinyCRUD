import dayjs from "dayjs";
import { GITEE_NUMBER, GITEE_OWNER, GITEE_REPO, mock } from "../helper/helper";
import jsonfile from 'jsonfile';

const filepath = 'src/__tests__/mock/json/gitee.json';

export async function initGiteeJSONFile() {
    await jsonfile.writeFile(filepath, []);
}

export async function mockGiteeFind() {
    const result = await jsonfile.readFile(filepath);
    mock.onGet(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}/comments`).reply(200, result);
}

export async function mockGiteeFindById(id: number) {
    mock.onGet(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/${id}`).reply(async (config) => {
        const result = await jsonfile.readFile(filepath);
        return [200, result.find((item: any) => item.id === id)];
    });
}

export async function mockGiteeCreate() {
    mock.onPost(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}/comments`).reply(async (config) => {
        const result = await jsonfile.readFile(filepath);
        const data = {
            id: Math.round(Math.random() * 1000000),
            body: JSON.parse(config.data).body,
            user: {
                id: 100001,
                login: "***",
                name: "***",
                avatar_url: "https://foruda.gitee.com/avatar/***/***.png",
            },
            created_at: dayjs().format(),
            updated_at: dayjs().format()
        };
        result.push(data)
        await jsonfile.writeFile(filepath, result, {spaces: 2});
        return [200, data];
    });
}