[简体中文](README.md) | ENGLISH 

# TinyCRUD

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/GuoXiCheng/TinyCRUD/ci.yml)
![Codecov branch](https://img.shields.io/codecov/c/github/GuoXiCheng/TinyCRUD/main)

## Introduction

TinyCRUD is a lightweight data storage library based on the Issue API of the code hosting platform. It can use Issue as a database table, and the comments of Issue as data table records. It serializes/deserializes data through the Issue API to achieve data addition, deletion, modification and query.

## Applicable scenarios

TinyCRUD is suitable for small teams or personal projects that require simple and lightweight data storage, but do not want or need to set up a complex database system.

## Supported code hosting platforms

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

## Supported request libraries

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
            axios
        </td>
        <td>
            wx（WeChat Mini Program）
        </td>
    </tr>
</table>

## Installation

```shell
npm install tiny-crud
```

## Usage

### Initialization

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

### Create Model

```ts
import { BaseModel } from "tiny-crud";

export interface UserModel extends BaseModel {
    name: string;
    age: number;
    gender: string;
}
```

### Create Repository

```ts
import { GithubRepository } from "tiny-crud";
import { githubRequest } from "./github-request";

export class UserRepository extends GithubRepository<UserModel> {
    constructor() {
        super(githubRequest, "Your Issue Number");
    }
}
```

### Basic Operations

```ts
const userRepository = new UserRepository();

// create data
userRepository.create({
    name: "John",
    age: 30,
    gender: "male",
});

// find data
userRepository.find();

// update data
userRepository.updateById(1, {
    name: "Mary",
    age: 25,
    gender: "female",
});

// delete data
userRepository.deleteById(1);
```

## Documentation

👉[TinyCRUD Docs](https://guoxicheng.top/en/projects/TinyCRUD-Docs) 

## License

[MIT](https://github.com/GuoXiCheng/TinyCRUD/blob/main/LICENSE)