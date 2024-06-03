# 创建请求

## 创建请求对象

### Node/Web 环境

::: code-group

```js [github]
import axios from "axios";
import { createRequest } from "tiny-crud";

const GithubRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",
});
```

```js [gitlab]
import axios from "axios";
import { createRequest } from "tiny-crud";

const gitlabRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "gitlab",
  projectId: "Your Project ID",
});
```

```js [gitee]
import axios from "axios";
import { createRequest } from "tiny-crud";

const giteeRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "gitee",
  owner: "Your Owner",
  repo: "Your Repo",
});
```

:::

### 微信小程序环境

```javascript
import { createRequest } from "tiny-crud";

const githubRequest = createRequest({
  httpLib: "wx",
  httpClient: wx,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",
});
```

## 设定 API 地址

默认情况下会使用官方的 API 地址，如果你需要将数据存储在私有的代码托管服务器上，可以使用 baseURL 字段指定 URL 地址：

::: details TinyCRUD 中使用的官方 API 地址

| 平台   | API 地址                 |
| ------ | ------------------------ |
| Github | `https://api.github.com` |
| Gitlab | `https://gitlab.com`     |
| Gitee  | `https://gitee.com`      |

:::

```javascript{9}
const githubRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",
  baseURL: "https://your-github-api.com",
});
```

## 验证授权

通过 `authenticate` 方法验证个人访问令牌授权是否成功。

```javascript
this.githubRequest.authenticate().then((res) => {
  console.log(res);
});
```
