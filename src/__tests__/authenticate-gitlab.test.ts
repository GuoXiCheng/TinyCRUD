import { USE_API, gitlabRequest } from "./helper/helper";
import { GitlabMock } from "./mock/gitlab-mock";

describe('Test Authenticate Gitlab', () => {
    beforeAll(() => {
        if (USE_API) return;
        new GitlabMock().setUpMock();
    });

    test('Test Authenticate Gitlab', async () => {
        const res = await gitlabRequest.authenticate();
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