简体中文 | [English](README.en.md)

# TinyCRUD

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/GuoXiCheng/TinyCRUD/ci.yml)
![Codecov branch](https://img.shields.io/codecov/c/github/GuoXiCheng/TinyCRUD/main)

## 介绍

TinyCRUD 是一个基于代码托管平台 Issue API 的轻量级数据存储库，它可以将 Issue 作为数据库表，Issue 的评论作为数据表记录，通过 Issue API 将数据序列化/反序列化，实现数据的增删改查。

## 适用场景

TinyCRUD 适合用于满足小型团队或个人项目中需要简单、轻量级数据存储，但又不想或不需要设置复杂数据库系统的情况。

## 支持的代码托管平台

<table>  
    <tr>
        <td>
            <p align="center">
                <img src="https://guoxicheng.top/assets/image/tiny-crud-docs/github.svg" title="Github"/>
            </p>
        </td>
        <td>
            <p align="center">
                <img src="https://guoxicheng.top/assets/image/tiny-crud-docs/gitlab.svg" title="Gitlab"/>
            </p>
        </td>
        <td>
            <p align="center">
                <img src="https://guoxicheng.top/assets/image/tiny-crud-docs/gitee.svg" title="Gitee"/>
            </p>
        </td>
    </tr>
    <tr>
        <td>
            Github API latest
        </td>
        <td>
            Gitlab API v4
        </td>
        <td>
            Gitee API v5
        </td>
    </tr>
</table>

## 支持的请求库

<table>
    <tr>
        <td>
            <img src="https://axios-http.com/assets/logo.svg" />
        </td>
        <td>
            <p align="center">
                <img src="https://guoxicheng.top/assets/image/tiny-crud-docs/wechat.svg" />
            </p>
        </td>
    </tr>
    <tr>
        <td>
            <p align="center">axios</p>
        </td>
        <td>
            wx（微信小程序）
        </td>
    </tr>
</table>

## 安装

```bash
npm install tiny-crud

```

## 使用

### 创建请求

```ts
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

### 创建数据模型

```ts
import { BaseModel } from "tiny-crud";

export interface UserModel extends BaseModel {
  name: string;
  age: number;
  gender: string;
}
```

### 创建数据存储库

```ts
import { GithubRepository } from "tiny-crud";
import { githubRequest } from "./github-request";

export class UserRepository extends GithubRepository<UserModel> {
  constructor() {
    super(githubRequest, "Your Issue Number");
  }
}
```

### 基本操作

```ts
const userRepository = new UserRepository();

// 创建数据
userRepository.create({
  name: "John",
  age: 30,
  gender: "male",
});

// 查询数据
userRepository.find();

// 更新数据
userRepository.updateById(1, {
  name: "Mary",
  age: 25,
  gender: "female",
});

// 删除数据
userRepository.deleteById(1);
```

## 详细文档

- 更好的阅读体验以及详细的使用文档请戳 👉[TinyCRUD Docs](https://tinycrud.guoxicheng.top)
- 如果对你有帮助的话可以给颗小星星，感谢支持！🌟

## License

[MIT](https://github.com/GuoXiCheng/TinyCRUD/blob/main/LICENSE)
