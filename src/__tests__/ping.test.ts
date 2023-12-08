import { StartTest } from "./helper/start-test";

test('Test Ping Gitee', async () => {
    const request = StartTest.getGiteeRequest();
    const res = await request.ping("gitee");
    expect(Object.keys(res)).toEqual([
        'id', 'login',
        'name', 'avatar_url',
        'url', 'html_url',
        'remark', 'followers_url',
        'following_url', 'gists_url',
        'starred_url', 'subscriptions_url',
        'organizations_url', 'repos_url',
        'events_url', 'received_events_url',
        'type', 'blog',
        'weibo', 'bio',
        'public_repos', 'public_gists',
        'followers', 'following',
        'stared', 'watched',
        'created_at', 'updated_at',
        'email'
    ]);
}, 30000);