import dayjs from "dayjs";
import { GITLAB_NUMBER, GITLAB_PROJECT_ID, mock, readJSONSync, writeJSONSync } from "../helper/helper";

const filename = "temp-gitlab.json";

export function setupGitlabMock() {
    writeJSONSync(filename, []);
    mockGitlabFind();
    mockGitlabCreate();
    mockGitlabFindById();
    mockGitlabUpdateById();
    mockGitlabDeleteById();
    mockGitlabDetail();
}

function mockGitlabFind() {
    mock?.onGet(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}/notes`).reply(async (config) => {
        const result = readJSONSync(filename);
        if (config.params) {
            Object.values(config.params).forEach((item)=>{
                expect(item).not.toBeNull();
            });
        }
        if (config.params?.sort) {
            const sort = config.params?.sort;
            result.sort((a: any, b: any) => {
                if (sort == "asc") {
                    return dayjs(a.created_at).isBefore(dayjs(b.created_at)) ? -1 : 1;
                } else {
                    return dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? -1 : 1;
                }
            });
        }
        return [200, result];
    });
}

function mockGitlabFindById() {
    mock?.onGet(new RegExp(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}/notes/\\d+`)).reply(async (config) => {
        const result = readJSONSync(filename);
        const id = config.url?.match(/\/notes\/(\d+)/)?.[1];
        const target = result.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "404 Not found"
            }];
        }
        return [200, target];
    });
}

function mockGitlabCreate() {
    mock?.onPost(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}/notes`).reply(async (config) => {
        const result = readJSONSync(filename);
        const data = {
            id: Math.round(Math.random() * 1000000),
            body: JSON.parse(config.data).body,
            system: false,
            author: {
                id: 100001,
                username: "***",
                name: "***",
                avatar_url: "https://foruda.gitlab.com/avatar/***/***.png",
            },
            created_at: dayjs().format(),
            updated_at: dayjs().format()
        };
        result.unshift(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        writeJSONSync(filename, result);
        return [200, data];
    });
}

function mockGitlabUpdateById() {
    mock?.onPut(new RegExp(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}/notes/\\d+`)).reply(async (config) => {
        const raw = readJSONSync(filename);
        const id = config.url?.match(/\/notes\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "404 Not found"
            }];
        }
        raw.forEach((item: any) => {
            if (item.id == id) {
                item.body = JSON.parse(config.data).body;
                item.updated_at = dayjs().format();
            }
        });
        writeJSONSync(filename, raw);
        const resAfter = readJSONSync(filename);
        return [200, resAfter.find((item: any) => item.id == id)];
    });
}

function mockGitlabDeleteById() {
    mock?.onDelete(new RegExp(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}/notes/\\d+`)).reply(async (config) => {
        const raw = readJSONSync(filename);
        const id = config.url?.match(/\/notes\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "404 Not found"
            }];
        }
        const remain = raw.find((item: any) => item.id != id);
        writeJSONSync(filename, remain ? remain : []);
        return [204];
    });
}

function mockGitlabDetail() {
    mock?.onGet(new RegExp(`https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/issues/${GITLAB_NUMBER}`)).reply(async (config) => {
        return [200, readJSONSync('mock-gitlab-detail.json')];
    });
}