export interface GiteeUser {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    url: string;
    html_url: string;
    remark: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    blog: string | null;
    weibo: string | null;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    stared: number;
    watched: number;
    created_at: string;
    updated_at: string;
    email: string | null;
}