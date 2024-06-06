# Creating a Data Repository

## What is a Data Repository

A data repository is used to define methods for manipulating data.

A data repository can inherit from a corresponding platform's repository class, thus having some basic CRUD methods.

## Customizing a Data Repository

### Defining the Repository Class

Inherit from the corresponding platform's repository class to be able to call the respective platform's Issue API.

The second parameter of the constructor: `Your Issue Number` represents the Issue number corresponding to the current repository. If not provided, it defaults to using the `issueNumber` property of the first parameter object.

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

### Creating Repository Objects

You can use the conventional object creation method to create a repository object:

```ts
const userRepository = new UserRepository();
```

Alternatively, you can use `SingletonFactory` to create a singleton object:

```ts
import { SingletonFactory } from "tiny-crud";

const userRepository = SingletonFactory.createInstance(UserRepository);
```

### Extending the Repository Class

The data repository provides some basic CRUD methods, but you can extend them further:

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
