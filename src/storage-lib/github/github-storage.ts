import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";
import { IssueDetail } from "../base/issue-detail";
import { RouteType } from "../base/route-type";
import { User } from "../base/user";
import { GithubDetail } from "./github-detail";
import { GithubParams } from "./github-params";
import { GithubUser } from "./github-user";

export class GithubStorage<T extends BaseModel> extends BaseStorage<T> {

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

    protected extractUser(comment: BaseComment): User | null {
        const { user } = comment;
        if (user) {
            const { id, login, avatar_url } = user as GithubUser;
            return { id, name: login, avatar_url };
        }
        return null;
    }
}