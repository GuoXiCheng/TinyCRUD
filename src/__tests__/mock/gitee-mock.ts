import dayjs from "dayjs";
import { OfficialUrl } from "../../enums";
import { GITEE_NUMBER, GITEE_OWNER, GITEE_REPO, mock, readJSONSync, writeJSONSync } from "../helper/helper";
import { BaseMock } from "./base-mock";

const filename = "temp-gitee.json";

export class GiteeMock extends BaseMock {
    private baseURL = OfficialUrl.gitee;

    constructor() {
        super(filename)
    }

    mockUser(): void {
        mock?.onGet(`${this.baseURL}/api/v5/user`).reply(async () => {
            return [200, readJSONSync('mock-gitee-user.json')];
        });
    }
    mockCreate(): void {
        mock?.onPost(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}/comments`).reply(async (config) => {
            const result = readJSONSync(filename);
            const data = {
                id: Math.round(Math.random() * 1000000),
                body: JSON.parse(config.data).body,
                user: {
                    id: 100001,
                    login: "***",
                    name: "***",
                    avatar_url: "https://foruda.gitee.com/avatar/***/***.png",
                },
                created_at: dayjs().format(),
                updated_at: dayjs().format()
            };
            result.push(data);
            writeJSONSync(filename, result);
            return [200, data];
        });
    }
    mockFind(): void {
        mock?.onGet(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}/comments`).reply(async (config) => {
            const result = readJSONSync(filename);
            if (config.params) {
                Object.values(config.params).forEach((item) => {
                    expect(item).not.toBeNull();
                });
            }
            if (config.params?.since) {
                return [200, result.filter((item: any) => dayjs(item.created_at).isAfter(dayjs(config.params.since)))];
            }
            if (config.params?.order) {
                return [200, config.params.order == 'desc' ? result.reverse() : result];
            }
            if (config.params?.page && config.params?.per_page) {
                const start = (config.params.page - 1) * config.params.per_page;
                const end = config.params.page * config.params.per_page;
                return [200, result.slice(start, end)];
            }
            return [200, result];
        });
    }
    mockFindById(): void {
        mock?.onGet(new RegExp(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
            const result = readJSONSync(filename);
            const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
            const target = result.find((item: any) => item.id == id);
            if (!target) {
                return [404, { message: '404 Not Found' }];
            }
            return [200, target];
        });
    }
    mockUpdateById(): void {
        mock?.onPatch(new RegExp(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
            const raw = readJSONSync(filename);
            const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
            const target = raw.find((item: any) => item.id == id);
            if (!target) {
                return [404, { message: '404 Not Found' }];
            }
            raw.forEach((item: any) => {
                if (item.id == id) {
                    item.body = JSON.parse(config.data).body;
                    item.updated_at = dayjs().format();
                }
            });
            writeJSONSync(filename, raw);
            const resAfter = readJSONSync(filename);
            return [200, resAfter.find((item: any) => item.id == id)];
        });
    }
    mockDeleteById(): void {
        mock?.onDelete(new RegExp(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/comments/\\d+`)).reply(async (config) => {
            const raw = readJSONSync(filename);
            const id = config.url?.match(/\/issues\/comments\/(\d+)/)?.[1];
            const target = raw.find((item: any) => item.id == id);
            if (!target) {
                return [404, { message: '404 Not Found' }];
            }
            const remain = raw.find((item: any) => item.id != id);
            writeJSONSync(filename, remain ? remain : []);
            return [204];
        });
    }
    mockDetail(): void {
        mock?.onGet(new RegExp(`${this.baseURL}/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/issues/${GITEE_NUMBER}`)).reply(async (config) => {
            return [200, readJSONSync('mock-gitee-detail.json')];
        });
    }

}