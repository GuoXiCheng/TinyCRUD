import { BaseRequest } from "../../request-lib/base/base-request";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseRepository } from "../base/base-repository";
import { IssueDetail } from "../base/issue-detail";
import { PlainObject } from "../base/plain-object";
import { RouteType } from "../base/route-type";
import { Author } from "../base/author";
import { GitlabDetail } from "./gitlab-detail";
import { GitlabParams } from "./gitlab-params";
import { GitlabUser } from "./gitlab-user";

export class GitlabRepository<T extends BaseModel> extends BaseRepository<T> {

    constructor(protected request: BaseRequest, issueNumber?: string) {
        super(request, issueNumber);
    }

    protected getRoute(routeType: keyof typeof RouteType, id?: number): string {
        switch (routeType) {
            case RouteType.find:
            case RouteType.create:
                return `${this.endpoint}/issues/${this.issueNumber}/notes`;
            case RouteType.findById:
            case RouteType.updateById:
            case RouteType.deleteById:
                return `${this.endpoint}/issues/${this.issueNumber}/notes/${id}`;
            case RouteType.detail:
                return `${this.endpoint}/issues/${this.issueNumber}`;
            default:
                throw new Error(`routeType ${routeType} is not supported`);
        }
    }

    /**
     * Finds items in the Gitlab storage based on the provided parameters.
     * @param params - Optional parameters for the find operation.
     * @param params.sort - Return requests sorted in asc or desc order. Default is desc.
     * @param params.order_by - Return requests ordered by created_at or updated_at fields. Default is created_at.
     * @returns A promise that resolves to an array of items.
     */
    async find(params?: GitlabParams): Promise<T[]> {
        const url = this.getRoute(RouteType.find);
        const response = await this.request.get<BaseComment[]>(url, params);
        return response.filter(item => item['system'] === false).map((item) => this.deserialize<T>(item));
    }

    /**
     * Updates a record by its ID.
     * 
     * @param id - The ID of the record to update.
     * @param data - The data to update the record with.
     * @returns A promise that resolves to the updated record.
     */
    async updateById(id: number, data: PlainObject<T>): Promise<T> {
        const url = this.getRoute(RouteType.updateById, id);
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.put<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Deletes all items from the storage.
     * @returns A Promise that resolves when all items are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = this.getRoute(RouteType.find);
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.filter(item => item['system'] === false).map((item) => this.deleteById(item.id)));
    }

    /**
     * Retrieves the detailed information of an issue from Gitlab.
     * @returns A promise that resolves to an object containing the issue details.
     */
    async detail(): Promise<IssueDetail> {
        const url = this.getRoute(RouteType.detail);
        const response = await this.request.get<GitlabDetail>(url);
        const { id, iid, user_notes_count, created_at, updated_at } = response;
        const result: IssueDetail = {
            id: id,
            issue_number: iid.toString(),
            comments: user_notes_count,
            created_at: created_at,
            updated_at: updated_at
        };
        return result;
    }

    protected extractUser(comment: BaseComment): Author | null {
        const { author } = comment;
        if (author) {
            const { id, name, avatar_url } = author as GitlabUser;
            const result: Author = {
                user_id: id,
                username: name,
                avatar_url: avatar_url
            };
            return result;
        }
        return null;
    }

}