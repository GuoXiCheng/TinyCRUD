# 创建数据模型

## 什么是数据模型

数据模型用于定义一个对象的数据结构。

数据模型可以继承自`BaseModel`，从而可以拥有基本的字段：`id`、`created_at`、`updated_at` 和 `created_by`，这些字段信息会从对应数据自动带出。

## 自定义数据模型

这里以一个用户数据模型为例，创建一个`User`模型，用户包含姓名、年龄、性别等字段。

```ts
import { BaseModel } from "tiny-crud";

export interface UserModel extends BaseModel {
  name: string;
  age: number;
  gender: string;
}
```
