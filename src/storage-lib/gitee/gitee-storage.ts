import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";
import { IssueDetail } from "../base/issue-detail";
import { RouteType } from "../base/route-type";
import { User } from "../base/user";
import { GiteeDetail } from "./gitee-detail";
import { GiteeParams } from "./gitee-params";
import { GiteeUser } from "./gitee-user";

export class GiteeStorage<T extends BaseModel> extends BaseStorage<T> {
    
    constructor(protected request: BaseRequest, protected issueNumber: string) {
        super(request, issueNumber);
    }

    async find(params?: GiteeParams): Promise<T[]> {
        return super.find(params);
    }

    /**
     * Retrieves the detailed information of an issue from Gitee.
     * @returns A promise that resolves to an object containing the issue details.
     */
    async detail(): Promise<IssueDetail> {
        const url = this.getRoute(RouteType.detail);
        const response = await this.request.get<GiteeDetail>(url);
        const {id, number, comments, created_at, updated_at} = response;
        const result: IssueDetail = {
            id: id,
            issue_number: number,
            comments: comments,
            created_at: created_at,
            updated_at: updated_at
        };
        return result;
    }

    protected extractUser(comment: BaseComment): User | null {
        const { user } = comment;
        if (user) {
            const { id, name, avatar_url } = user as GiteeUser;
            return { id, name, avatar_url };
        }
        return null;
    }
    
}