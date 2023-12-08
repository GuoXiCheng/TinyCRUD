import { AxiosInstance } from "axios";
import { RequestType, StoragePlatform } from "../enums";

export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
    header?: object;
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}

export interface TinyRequest {
    get<T>(url: string): Promise<T>;
    post(url: string): void;
    ping<P extends keyof typeof StoragePlatform>(platform: P): Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]>;
};

export type RequestInstance = WxInstance | AxiosInstance;

type RequestTypeMap = {
    [RequestType.wx]: WxInstance;
    [RequestType.axios]: AxiosInstance;
}
export interface TinyRequestOptions<T extends RequestType> {
    requestType: T;
    request: RequestTypeMap[T];
    baseUrl: string;
    accessToken: string;
}

export type StoragePlatformUserMap = {
    [StoragePlatform.gitee]: GiteeUser;
    [StoragePlatform.github]: GithubUser;
    [StoragePlatform.gitlab]: GitlabUser;
}

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

export interface GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
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
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface GitlabUser {
    id: number;
    username: string;
    name: string;
    state: string;
    locked: boolean;
    avatar_url: string;
    web_url: string;
    created_at: string;
    bio: string;
    location: string;
    public_email: string | null;
    skype: string;
    linkedin: string;
    twitter: string;
    discord: string;
    website_url: string;
    organization: string;
    job_title: string;
    pronouns: string | null;
    bot: boolean;
    work_information: any | null;
    local_time: string | null;
    last_sign_in_at: string | null;
    confirmed_at: string;
    last_activity_on: string;
    email: string;
    theme_id: number;
    color_scheme_id: number;
    projects_limit: number;
    current_sign_in_at: string | null;
    identities: any[];
    can_create_group: boolean;
    can_create_project: boolean;
    two_factor_enabled: boolean;
    external: boolean;
    private_profile: boolean;
    commit_email: string;
    shared_runners_minutes_limit: number | null;
    extra_shared_runners_minutes_limit: number | null;
    scim_identities: any[];
}