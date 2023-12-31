import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";
import { PlainObject } from "../base/plain-object";
import { RouteType } from "../base/route-type";
import { GitlabParams } from "./gitlab-params";

export class GitlabStorage<T extends BaseModel> extends BaseStorage<T> {

    constructor(protected request: BaseRequest, protected issueNumber: string) {
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
            default:
                throw new Error(`routeType ${routeType} is not supported`);
        }
    }

    async find(params?: GitlabParams): Promise<T[]> {
        return super.find(params);
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
    
}