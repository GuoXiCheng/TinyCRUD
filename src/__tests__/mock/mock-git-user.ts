import { mock, readJSONSync } from "../helper/helper";

export function mockGiteeUser() {
    mock.onGet('https://gitee.com/api/v5/user').reply(async () => {
        return [200, readJSONSync('mock-gitee-user.json')];
    });
}

export function mockGithubUser() {
    mock.onGet('https://api.github.com/user').reply(async () => {
        return [200, readJSONSync('mock-github-user.json')];
    });
}

export function mockGitlabUser() {
    mock.onGet('https://gitlab.com/api/v4/user').reply(async () => {
        return [200, readJSONSync('mock-gitlab-user.json')]
    });
}