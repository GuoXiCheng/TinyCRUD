import { GiteeParams } from "../gitee/gitee-params";
import { GithubParams } from "../github/github-params";
import { GitlabParams } from "../gitlab/gitlab-params";

export type BaseParams = GiteeParams | GithubParams | GitlabParams;