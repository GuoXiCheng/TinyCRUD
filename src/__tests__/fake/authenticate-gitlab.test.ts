import { gitlabRequest } from "../helper/helper";
import { mockGitlabUser } from "../mock/mock-gitlab-user";

describe('Test Fake Authenticate Gitlab', () => {
    test('Test Authenticate Gitlab', async () => {
        mockGitlabUser();
        const res = await gitlabRequest.authenticate();
        expect(res).toEqual({
            id: 100001,
            username: '***',
            name: '***',
            state: 'active',
            locked: false,
            avatar_url: 'https://secure.gravatar.com/avatar/***?s=80&d=identicon',
            web_url: 'https://gitlab.com/***',
            created_at: '2023-12-21T02:56:43.269Z',
            bio: '',
            location: '',
            public_email: null,
            skype: '',
            linkedin: '',
            twitter: '',
            discord: '',
            website_url: '',
            organization: '',
            job_title: '',
            pronouns: null,
            bot: true,
            work_information: null,
            local_time: null,
            last_sign_in_at: null,
            confirmed_at: '2023-12-21T02:56:43.230Z',
            last_activity_on: '2024-01-12',
            email: '***@noreply.gitlab.com',
            theme_id: 0,
            color_scheme_id: 0,
            projects_limit: 0,
            current_sign_in_at: null,
            identities: [],
            can_create_group: true,
            can_create_project: true,
            two_factor_enabled: false,
            external: false,
            private_profile: false,
            commit_email: '***@noreply.gitlab.com',
            shared_runners_minutes_limit: null,
            extra_shared_runners_minutes_limit: null,
            scim_identities: []
        });
    });
});