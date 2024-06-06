# 创建数据存储库

## 什么是数据存储库

数据存储库用于定义操作数据的方法。

数据存储库可以继承自对应平台的存储库类，从而可以拥有一些基本的增删改查方法。

## 自定义数据存储库

### 定义存储库类

继承对应平台的存储库类，即可调用相应平台的 Issue API。

其中构造器的第二个参数：`Your Issue Number`表示当前存储库所对应的 Issue 编号。如果不传，则默认会使用第一个参数对象的 `issueNumber` 属性。

::: code-group

```ts [github]
import { GithubRepository } from "tiny-crud";
import { githubRequest } from "./github-request";

export class UserRepository extends GithubRepository<UserModel> {
  constructor() {
    super(githubRequest, "Your Issue Number");
  }
}
```

```ts [gitee]
import { GiteeRepository } from "tiny-crud";
import { giteeRequest } from "./gitee-request";

export class UserRepository extends GiteeRepository<UserModel> {
  constructor() {
    super(giteeRequest, "Your Issue Number");
  }
}
```

```ts [gitlab]
import { GitlabRepository } from "tiny-crud";
import { gitlabRequest } from "./gitlab-request";

export class UserRepository extends GitlabRepository<UserModel> {
  constructor() {
    super(gitlabRequest, "Your Issue Number");
  }
}
```

:::

### 创建存储库对象

可以使用常规的创建对象的方法来创建存储库对象：

```ts
const userRepository = new UserRepository();
```

也可以使用`SingletonFactory`来创建一个单例对象：

```ts
import { SingletonFactory } from "tiny-crud";

const userRepository = SingletonFactory.createInstance(UserRepository);
```

### 扩展存储库类

数据存储库提供了一些基本的增删改查方法，当然也可以进一步扩展：

```ts
import { GithubRepository } from "tiny-crud";
import { githubRequest } from "./github-request";

export class UserRepository extends GithubRepository<UserModel> {
  constructor() {
    super(githubRequest);
  }

  async findByName(name: string): Promise<UserModel[]> {
    const users = await this.find();
    return users.filter((user) => user.name === name);
  }
}
```
