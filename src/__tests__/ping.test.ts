import { StartTest } from "./helper/start-test";

describe('Test Ping Function', () => {
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
    });
    test('Test Ping Github', async () => {
        const request = StartTest.getGithubRequest();
        const res = await request.ping("github");
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
    test('Test Ping Gitlab', async () => {
        const request = StartTest.getGitlabRequest();
        const res = await request.ping("gitlab");
        expect(Object.keys(res)).toEqual([
            'id',
            'username',
            'name',
            'state',
            'locked',
            'avatar_url',
            'web_url',
            'created_at',
            'bio',
            'location',
            'public_email',
            'skype',
            'linkedin',
            'twitter',
            'discord',
            'website_url',
            'organization',
            'job_title',
            'pronouns',
            'bot',
            'work_information',
            'local_time',
            'last_sign_in_at',
            'confirmed_at',
            'last_activity_on',
            'email',
            'theme_id',
            'color_scheme_id',
            'projects_limit',
            'current_sign_in_at',
            'identities',
            'can_create_group',
            'can_create_project',
            'two_factor_enabled',
            'external',
            'private_profile',
            'commit_email',
            'shared_runners_minutes_limit',
            'extra_shared_runners_minutes_limit',
            'scim_identities'
        ]);
    });
});

