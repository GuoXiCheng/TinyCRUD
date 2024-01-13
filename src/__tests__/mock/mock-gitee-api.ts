import dayjs from "dayjs";
import { GITEE_NUMBER, GITEE_OWNER, GITEE_REPO, mock } from "../helper/helper";
import jsonfile from 'jsonfile';

const filepath = 'src/__tests__/mock/json/gitee.json';

export async function initGiteeJSONFile() {
    await jsonfile.writeFile(filepath, []);
}

export async function mockGiteeFind() {
    mock.onGet(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}/comments`).reply(async (config) => {
        const result = await jsonfile.readFile(filepath);
        if (config.params?.since) {
            return [200, result.filter((item: any) => dayjs(item.created_at).isAfter(dayjs(config.params.since)))];
        }
        if (config.params?.order) {
            return [200, config.params.order == 'desc' ? result.reverse() : result];
        }
        if (config.params?.page && config.params?.per_page) {
            const start = (config.params.page - 1) * config.params.per_page;
            const end = config.params.page * config.params.per_page;
            return [200, result.slice(start, end)];
        }
        return [200, result];
    });
}

export async function mockGiteeFindById() {
    mock.onGet(new RegExp(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const result = await jsonfile.readFile(filepath);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = result.find((item: any) => item.id == id);
        if (!target) {
            return [404, { message: '404 Not Found' }];
        }
        return [200, target];
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
        result.push(data);
        await jsonfile.writeFile(filepath, result, { spaces: 2 });
        return [200, data];
    });
}

export async function mockGiteeUpdateById() {
    mock.onPatch(new RegExp(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const raw = await jsonfile.readFile(filepath);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, { message: '404 Not Found' }];
        }
        raw.forEach((item: any) => {
            if (item.id == id) {
                item.body = JSON.parse(config.data).body;
                item.updated_at = dayjs().format();
            }
        });
        await jsonfile.writeFile(filepath, raw, { spaces: 2 });
        const resAfter = await jsonfile.readFile(filepath);
        return [200, resAfter.find((item: any) => item.id == id)];
    });
}

export async function mockGiteeDeleteById() {
    mock.onDelete(new RegExp(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
        const raw = await jsonfile.readFile(filepath);
        const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
        const target = raw.find((item: any) => item.id == id);
        if (!target) {
            return [404, { message: '404 Not Found' }];
        }
        const remain = raw.find((item: any) => item.id != id);
        await jsonfile.writeFile(filepath, remain ? remain : [], { spaces: 2 });
        return [204];
    });
}

export async function mockGiteeDetail() {
    mock.onGet(new RegExp(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}`)).reply(async (config) => {
        return [200, {
            "id": 100001,
            "url": "https://gitee.com/api/v5/repos/***/***/issues/***",
            "repository_url": "https://gitee.com/api/v5/repos/***/***",
            "labels_url": "https://gitee.com/api/v5/repos/***/***/issues/***/labels",
            "comments_url": "https://gitee.com/api/v5/repos/***/***/issues/***/comments",
            "html_url": "https://gitee.com/***/***/issues/***",
            "parent_url": null,
            "number": "***",
            "parent_id": 0,
            "depth": 0,
            "state": "open",
            "title": "***",
            "body": "test body",
            "user": {
                "id": 100001,
                "login": "***",
                "name": "***",
                "avatar_url": "https://foruda.gitee.com/avatar/***466/***59_***_***75.png",
                "url": "https://gitee.com/api/v5/users/***",
                "html_url": "https://gitee.com/***",
                "remark": "",
                "followers_url": "https://gitee.com/api/v5/users/***/followers",
                "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
                "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
                "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
                "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
                "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
                "repos_url": "https://gitee.com/api/v5/users/***/repos",
                "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
                "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
                "type": "User"
            },
            "labels": [],
            "assignee": null,
            "collaborators": [],
            "repository": {
                "id": 100001,
                "full_name": "***/***",
                "human_name": "***/***",
                "url": "https://gitee.com/api/v5/repos/***/***",
                "namespace": {
                    "id": 100001,
                    "type": "personal",
                    "name": "***",
                    "path": "***",
                    "html_url": "https://gitee.com/***"
                },
                "path": "***",
                "name": "***",
                "owner": {
                    "id": 100001,
                    "login": "***",
                    "name": "***",
                    "avatar_url": "https://foruda.gitee.com/avatar/***466/***59_***_***75.png",
                    "url": "https://gitee.com/api/v5/users/***",
                    "html_url": "https://gitee.com/***",
                    "remark": "",
                    "followers_url": "https://gitee.com/api/v5/users/***/followers",
                    "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
                    "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
                    "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
                    "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
                    "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
                    "repos_url": "https://gitee.com/api/v5/users/***/repos",
                    "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
                    "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
                    "type": "User"
                },
                "assigner": {
                    "id": 100001,
                    "login": "***",
                    "name": "***",
                    "avatar_url": "https://foruda.gitee.com/avatar/***466/***59_***_***75.png",
                    "url": "https://gitee.com/api/v5/users/***",
                    "html_url": "https://gitee.com/***",
                    "remark": "",
                    "followers_url": "https://gitee.com/api/v5/users/***/followers",
                    "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
                    "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
                    "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
                    "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
                    "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
                    "repos_url": "https://gitee.com/api/v5/users/***/repos",
                    "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
                    "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
                    "type": "User"
                },
                "description": "",
                "private": true,
                "public": false,
                "internal": false,
                "fork": false,
                "html_url": "https://gitee.com/***/***.git",
                "ssh_url": "git@gitee.com:***/***.git",
                "forks_url": "https://gitee.com/api/v5/repos/***/***/forks",
                "keys_url": "https://gitee.com/api/v5/repos/***/***/keys{/key_id}",
                "collaborators_url": "https://gitee.com/api/v5/repos/***/***/collaborators{/collaborator}",
                "hooks_url": "https://gitee.com/api/v5/repos/***/***/hooks",
                "branches_url": "https://gitee.com/api/v5/repos/***/***/branches{/branch}",
                "tags_url": "https://gitee.com/api/v5/repos/***/***/tags",
                "blobs_url": "https://gitee.com/api/v5/repos/***/***/blobs{/sha}",
                "stargazers_url": "https://gitee.com/api/v5/repos/***/***/stargazers",
                "contributors_url": "https://gitee.com/api/v5/repos/***/***/contributors",
                "commits_url": "https://gitee.com/api/v5/repos/***/***/commits{/sha}",
                "comments_url": "https://gitee.com/api/v5/repos/***/***/comments{/number}",
                "issue_comment_url": "https://gitee.com/api/v5/repos/***/***/issues/comments{/number}",
                "issues_url": "https://gitee.com/api/v5/repos/***/***/issues{/number}",
                "pulls_url": "https://gitee.com/api/v5/repos/***/***/pulls{/number}",
                "milestones_url": "https://gitee.com/api/v5/repos/***/***/milestones{/number}",
                "notifications_url": "https://gitee.com/api/v5/repos/***/***/notifications{?since,all,participating}",
                "labels_url": "https://gitee.com/api/v5/repos/***/***/labels{/name}",
                "releases_url": "https://gitee.com/api/v5/repos/***/***/releases{/id}",
                "recommend": false,
                "gvp": false,
                "homepage": null,
                "language": null,
                "forks_count": 0,
                "stargazers_count": 0,
                "watchers_count": 1,
                "default_branch": null,
                "open_issues_count": 1,
                "has_issues": true,
                "has_wiki": true,
                "issue_comment": false,
                "can_comment": true,
                "pull_requests_enabled": true,
                "has_page": false,
                "license": null,
                "outsourced": false,
                "project_creator": "***",
                "members": [
                    "***"
                ],
                "pushed_at": null,
                "created_at": "2023-11-16T22:03:27+08:00",
                "updated_at": "2023-11-16T22:03:44+08:00",
                "parent": null,
                "paas": null,
                "assignees_number": 1,
                "testers_number": 1,
                "assignee": [
                    {
                        "id": 100001,
                        "login": "***",
                        "name": "***",
                        "avatar_url": "https://foruda.gitee.com/avatar/***466/***59_***_***75.png",
                        "url": "https://gitee.com/api/v5/users/***",
                        "html_url": "https://gitee.com/***",
                        "remark": "",
                        "followers_url": "https://gitee.com/api/v5/users/***/followers",
                        "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
                        "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
                        "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
                        "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
                        "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
                        "repos_url": "https://gitee.com/api/v5/users/***/repos",
                        "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
                        "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
                        "type": "User"
                    }
                ],
                "testers": [
                    {
                        "id": 100001,
                        "login": "***",
                        "name": "***",
                        "avatar_url": "https://foruda.gitee.com/avatar/***466/***59_***_***75.png",
                        "url": "https://gitee.com/api/v5/users/***",
                        "html_url": "https://gitee.com/***",
                        "remark": "",
                        "followers_url": "https://gitee.com/api/v5/users/***/followers",
                        "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
                        "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
                        "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
                        "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
                        "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
                        "repos_url": "https://gitee.com/api/v5/users/***/repos",
                        "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
                        "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
                        "type": "User"
                    }
                ],
                "status": "开始",
                "programs": [],
                "enterprise": null,
                "project_labels": [],
                "issue_template_source": "project"
            },
            "milestone": null,
            "created_at": "2023-11-16T22:03:44+08:00",
            "updated_at": "2024-01-12T11:31:23+08:00",
            "plan_started_at": null,
            "deadline": null,
            "finished_at": null,
            "scheduled_time": 0,
            "comments": 720,
            "priority": 0,
            "issue_type": "任务",
            "program": null,
            "security_hole": false,
            "issue_state": "待办的",
            "branch": null,
            "issue_type_detail": {
                "id": 1,
                "title": "任务",
                "template": null,
                "ident": "task",
                "color": "#0086D6",
                "is_system": true,
                "created_at": "2017-09-01T03:09:12+08:00",
                "updated_at": "2017-09-01T03:09:12+08:00"
            },
            "issue_state_detail": {
                "id": 1,
                "title": "待办的",
                "color": "#8c92a4",
                "icon": "icon-task-state-21",
                "command": null,
                "serial": 1,
                "created_at": "2017-09-01T03:09:13+08:00",
                "updated_at": "2017-09-01T03:09:13+08:00"
            }
        }];
    });
}