export type TinyCRUDConfig = {
    base_url: string;
    owner: string;
    repo: string;
    issue_number: string;
    access_token: string;
    git_platform: "gitee" | "github" | "gitlab";
    request_lib: "axios" | "wx";
    request_object?: any;
}
export class TinyCRUD {
    constructor(private config: TinyCRUDConfig) {

    }

    async createOne(body: string | Object) {
        switch (this.config.git_platform) {
            case "gitee":
                const url = `${this.config.base_url}/api/v5/repos/${this.config.owner}/${this.config.repo}/issues/${this.config.issue_number}/comments`;
                if (this.config.request_lib === "axios") {
                    
                    const result = await this.config.request_object.post(url, { body }, { headers: { 'Authorization': this.config.access_token } });
                    return result.data;
                } else if (this.config.request_lib === "wx") {
                    return new Promise(resolve => {
                        this.config.request_object.request({
                            url: url,
                            method: 'POST',
                            header: {
                                'Authorization': this.config.access_token
                            },
                            data: {
                                body
                            },
                            async success(res: any) {
                                resolve(res);
                            }
                        });
                    });
                }
                break;
            case "github":
                if (this.config.request_lib === "axios") {

                } else if (this.config.request_lib === "wx") { }
                break;
            case "gitlab":
                if (this.config.request_lib === "axios") {

                } else if (this.config.request_lib === "wx") { }
                break;
        }
    }

    findById(id: number) {

    }
}
