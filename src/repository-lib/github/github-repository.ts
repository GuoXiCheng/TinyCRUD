import { BaseRequest } from "../../request-lib";
import { Author } from "../base/author";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseRepository } from "../base/base-repository";
import { IssueDetail } from "../base/issue-detail";
import { RouteType } from "../base/route-type";
import { GithubDetail } from "./github-detail";
import { GithubParams } from "./github-params";
import { GithubUser } from "./github-user";

export class GithubRepository<T extends BaseModel> extends BaseRepository<T> {

    constructor(protected request: BaseRequest, issueNumber?: string) {
        super(request, issueNumber);
    }

    async find(params?: GithubParams): Promise<T[]> {
        return super.find(params);
    }

    /**
     * Retrieves the detailed information of an issue from Gitee.
     * @returns A promise that resolves to an object containing the issue details.
     */
    async detail(): Promise<IssueDetail> {
        const url = this.getRoute(RouteType.detail);
        const response = await this.request.get<GithubDetail>(url);
        const {id, number, comments, created_at, updated_at} = response;
        const result: IssueDetail = {
            id: id,
            issue_number: number.toString(),
            comments: comments,
            created_at: created_at,
            updated_at: updated_at
        };
        return result;
    }

    protected extractUser(comment: BaseComment): Author | null {
        const { user } = comment;
        if (user) {
            const { id, login, avatar_url } = user as GithubUser;
            const author: Author = {
                user_id: id,
                username: login,
                avatar_url: avatar_url
            };
            return author;
        }
        return null;
    }
}