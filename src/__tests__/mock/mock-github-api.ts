import dayjs from "dayjs";
import { GITHUB_NUMBER, GITHUB_OWNER, GITHUB_REPO, mock, readJSONSync, writeJSONSync } from "../helper/helper";

const filename = "temp-github.json";

export function setupGithubMock() {
    writeJSONSync(filename, []);
    mockGithubFind();
    mockGithubCreate();
    mockGithubFindById();
    mockGiteeUpdateById();
    mockGiteeDeleteById();
    mockGiteeDetail();
};

function mockGithubFind() {
    mock?.onGet(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${GITHUB_NUMBER}/comments`).reply(async (config) => {
        const result = readJSONSync(filename);
        if (config.params) {
            Object.values(config.params).forEach((item)=>{
                expect(item).not.toBeNull();
            })
        }
        if (config.params?.since) {
            return [200, result.filter((item: any) => dayjs(item.created_at).isAfter(dayjs(config.params.since)))];
        }
        if (config.params?.page && config.params?.per_page) {
            const start = (config.params.page - 1) * config.params.per_page;
            const end = config.params.page * config.params.per_page;
            return [200, result.slice(start, end)];
        }
        return [200, result];
    });
}

function mockGithubFindById() {
    mock?.onGet(new RegExp(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const result = readJSONSync(filename);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = result.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#get-an-issue-comment"
            }];
        }
        return [200, target];
    });
}

function mockGithubCreate() {
    mock?.onPost(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${GITHUB_NUMBER}/comments`).reply(async (config) => {
        const result = readJSONSync(filename);
        const data = {
            id: Math.round(Math.random() * 1000000),
            body: JSON.parse(config.data).body,
            user: {
                id: 100001,
                login: "***",
                name: "***",
                avatar_url: "https://foruda.github.com/avatar/***/***.png",
            },
            created_at: dayjs().format(),
            updated_at: dayjs().format()
        };
        result.push(data);
        writeJSONSync(filename, result);
        return [200, data];
    });
}

function mockGiteeUpdateById() {
    mock?.onPatch(new RegExp(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const raw = readJSONSync(filename);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#update-an-issue-comment"
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

function mockGiteeDeleteById() {
    mock?.onDelete(new RegExp(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const raw = readJSONSync(filename);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, {
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#delete-an-issue-comment"
            }];
        }
        const remain = raw.find((item: any) => item.id != id);
        writeJSONSync(filename, remain ? remain : []);
        return [204];
    });
}

function mockGiteeDetail() {
    mock?.onGet(new RegExp(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${GITHUB_NUMBER}`)).reply(async (config) => {
        return [200, readJSONSync('mock-github-detail.json')];
    });
}