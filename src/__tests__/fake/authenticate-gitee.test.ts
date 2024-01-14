import { giteeRequest } from '../helper/helper';
import { mockGiteeUser } from '../mock/mock-git-user';

describe('Test Fake Authenticate Gitee', () => {
  test('Test Authenticate Gitee', async () => {
    mockGiteeUser();
    const res = await giteeRequest.authenticate();
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
});