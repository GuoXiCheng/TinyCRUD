# Creating Requests

## Create Request Object

### For Node/Web Environments

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

### For WeChat Mini Program Environment

```js
import { createRequest } from "tiny-crud";

const GithubRequest = createRequest({
  httpLib: "wx",
  httpClient: wx,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",
});
```

## Set API URL

By default, the official API URLs are used. If you need to store data on a private code hosting server, you can specify the URL using the baseURL field:

::: details Official API URLs used in TinyCRUD

| Platform | API URL                  |
| -------- | ------------------------ |
| Github   | `https://api.github.com` |
| Gitlab   | `https://gitlab.com`     |
| Gitee    | `https://gitee.com`      |

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

## Authenticate

Verify if the personal access token authorization is successful using the authenticate method.

```js
this.GithubRequest.authenticate().then((res) => {
  console.log(res);
});
```
