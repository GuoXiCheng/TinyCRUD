import { giteeRequest } from './helper/helper';
describe('Test Use Fake Authenticate Gitee', () => {
  test('Test Authenticate Gitee', async () => {
    const res = await giteeRequest.authenticate();
    expect(res).toEqual({
      id: 1000001,
      login: '***',
      name: '***',
      avatar_url: 'https://foruda.gitee.com/avatar/***/***.png',
      url: 'https://gitee.com/api/v5/users/***',
      html_url: 'https://gitee.com/***',
      remark: '',
      followers_url: 'https://gitee.com/api/v5/users/***/followers',
      following_url: 'https://gitee.com/api/v5/users/***/following_url{/other_user}',
      gists_url: 'https://gitee.com/api/v5/users/***/gists{/gist_id}',
      starred_url: 'https://gitee.com/api/v5/users/***/starred{/owner}{/repo}',
      subscriptions_url: 'https://gitee.com/api/v5/users/***/subscriptions',
      organizations_url: 'https://gitee.com/api/v5/users/***/orgs',
      repos_url: 'https://gitee.com/api/v5/users/***/repos',
      events_url: 'https://gitee.com/api/v5/users/***/events{/privacy}',
      received_events_url: 'https://gitee.com/api/v5/users/***/received_events',
      type: 'User',
      blog: null,
      weibo: null,
      bio: '',
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      stared: 0,
      watched: 0,
      created_at: '2020-02-26T13:20:27+08:00',
      updated_at: '2024-01-10T22:27:59+08:00',
      email: null
    });
  });
});