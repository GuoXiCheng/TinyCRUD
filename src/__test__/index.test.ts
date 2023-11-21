import { TinyCRUD } from "../index";
import 'dotenv/config';
test("index gitee", async ()=>{
    const tinyCRUD = new TinyCRUD({
        owner: "guoxicheng",
        repo: "tiny-crud",
        issue_number: "I8H4X2",
        base_url: "https://gitee.com",
        request_lib: "axios",
        access_token: process.env.GITEE_TOKEN as string,
        git_platform: "gitee"
    });

    const detail = await tinyCRUD.createOne("测试");
    expect(detail).toHaveProperty("body", "测试");
}, 30000);