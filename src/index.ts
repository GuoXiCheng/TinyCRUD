export class TinyCRUD { 
    find() {
        console.log("find success");
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