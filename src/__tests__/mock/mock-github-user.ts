import { mock } from "../helper/helper";

export function mockGithubUser() {
    mock.onGet('https://api.github.com/user').reply(200, {
        "login": "***",
        "id": 1000001,
        "node_id": "***",
        "avatar_url": "https://avatars.githubusercontent.com/u/***?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/***",
        "html_url": "https://github.com/***",
        "followers_url": "https://api.github.com/users/***/followers",
        "following_url": "https://api.github.com/users/***/following{/other_user}",
        "gists_url": "https://api.github.com/users/***/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/***/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/***/subscriptions",
        "organizations_url": "https://api.github.com/users/***/orgs",
        "repos_url": "https://api.github.com/users/***/repos",
        "events_url": "https://api.github.com/users/***/events{/privacy}",
        "received_events_url": "https://api.github.com/users/***/received_events",
        "type": "User",
        "site_admin": false,
        "name": "***",
        "company": null,
        "blog": "***.github.io",
        "location": "***",
        "email": null,
        "hireable": null,
        "bio": "***",
        "twitter_username": null,
        "public_repos": 0,
        "public_gists": 0,
        "followers": 0,
        "following": 0,
        "created_at": "2017-12-04T12:29:35Z",
        "updated_at": "2023-12-17T04:01:22Z"
    });
}