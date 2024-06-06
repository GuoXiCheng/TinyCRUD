# Creating a Data Model

## What is a Data Model

A data model is used to define the data structure of an object.

Data models can inherit from `BaseModel`, thereby having basic fields: `id`, `created_at`, `updated_at`, and `created_by`, which are automatically populated from the corresponding data.

## Custom Data Model

Here, as an example of a user data model, we create a `User` model that includes fields such as name, age, and gender.

```ts
import { BaseModel } from "tiny-crud";

export interface UserModel extends BaseModel {
  name: string;
  age: number;
  gender: string;
}
```
