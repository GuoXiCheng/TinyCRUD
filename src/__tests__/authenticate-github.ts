import { StartTest } from "./helper/start-test";

describe('Test Authenticate Github', () => {
    test('Test Authenticate Github', async () => {
        const request = StartTest.createGithubRequest();
        const res = await request.authenticate();
        expect(Object.keys(res)).toEqual([
            'login', 'id',
            'node_id', 'avatar_url',
            'gravatar_id', 'url',
            'html_url', 'followers_url',
            'following_url', 'gists_url',
            'starred_url', 'subscriptions_url',
            'organizations_url', 'repos_url',
            'events_url', 'received_events_url',
            'type', 'site_admin',
            'name', 'company',
            'blog', 'location',
            'email', 'hireable',
            'bio', 'twitter_username',
            'public_repos', 'public_gists',
            'followers', 'following',
            'created_at', 'updated_at'
        ]);
    });
});