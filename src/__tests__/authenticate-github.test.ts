import { GithubUser } from "../index";
import { USE_API, githubRequest } from "./helper/helper";
import { GithubMock } from "./mock/github-mock";

describe('Test Authenticate Github', () => {
    beforeAll(() => {
        if (USE_API) return;
        new GithubMock().setUpMock();
    });

    test('Test Authenticate Github', async () => {
        const res = await githubRequest.authenticate() as GithubUser;
        console.log(res.blog);
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