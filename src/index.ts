export class TinyCRUD {
    constructor(
        private wx: any,
        private owner: string,
        private repo: string,
        private issueNumber: number,
        private accessToken: string) {

    }
    find() {
        this.wx.request({
            url: `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/issues/${this.issueNumber}/comments?page=1&per_page=10&order=desc`, // 你的数据接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'Authorization': this.accessToken
            },
            success(res: any) {
                console.log(res.data) // 在控制台输出返回的数据
            },
            fail(err: any) {
                console.log(err) // 输出错误信息
            }
        })
    }
}

// import axios, { AxiosRequestConfig } from 'axios';
// export class TinyCRUD {
//     constructor(
//         private owner: string,
//         private repo: string,
//         private issueNumber: string,
//         private accessToken: string) {

//     }

//     async find () {
//         const config: AxiosRequestConfig = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/issues/${this.issueNumber}/comments?page=1&per_page=10&order=desc`,
//             headers: {
//                 'Authorization': this.accessToken
//             }
//         }

//         return axios.request(config).then(res=>res.data);
//     }
// }