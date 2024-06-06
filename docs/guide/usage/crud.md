# 增删改查方法

## detail - 查询存储库详情

```ts
userRepository.detail().then((res) => console.log(res));
```

返回的字段信息参考如下：

| 字段名       | 类型   | 描述           |
| ------------ | ------ | -------------- |
| id           | number | Issue Id       |
| issue_number | string | Issue 编号     |
| comments     | number | Issue 评论数   |
| created_at   | string | Issue 创建时间 |
| updated_at   | string | Issue 更新时间 |

::: details comments 字段说明
对于 Github 或 Gitlab，comments 字段显示的是实际数量，对于 Gitee，comments 字段显示的是累计的数量。

例如：新增 10 笔数据后再全部删除，对于 Github 或 Gitlab，comments 字段显示的是 0，对于 Gitee，comments 字段显示的是 10。
:::

## create - 创建一笔数据

```ts
userRepository.create({
  name: "John",
  age: 30,
  gender: "male",
});
```

## createAll - 创建多笔数据

```ts
userRepository.createAll([
  {
    name: "John",
    age: 30,
    gender: "male",
  },
  {
    name: "Mary",
    age: 25,
    gender: "female",
  },
]);
```

## find - 查询数据

```ts
userRepository.find().then((res) => console.log(res));
```

find 方法支持传入查询参数，例如：

```ts
userRepository
  .find({
    since: "2021-01-01T00:00:00Z",
    per_page: 10,
    page: 1,
  })
  .then((res) => console.log(res));
```

find 方法支持的查询参数依据存储平台的不同而有所差异：

::: details Github 查询参数说明

| 字段名   | 类型   | 描述                                                                            |
| -------- | ------ | ------------------------------------------------------------------------------- |
| since    | string | 只返回在给定时间之后更新的数据，时间格式为 ISO 8601 格式 `YYYY-MM-DDTHH:MM:SSZ` |
| page     | number | 返回第几页的数据，默认为 1                                                      |
| per_page | number | 每页返回的数据条数，默认为 30，最大为 100                                       |

:::

::: details Gitee 查询参数说明
| 字段名 | 类型 | 描述 |
| -------- | ------ | ------------------------------------------------------------------------------- |
| since | string | 只返回在给定时间之后更新的数据，时间格式为 ISO 8601 格式 `YYYY-MM-DDTHH:MM:SSZ` |
| page | number | 当前的页码 |
| per_page | number | 每页的数量，默认为 20，最大为 100 |
| order | string | 排序顺序: asc（默认），desc |
:::

::: details Gitlab 查询参数说明
| 字段名 | 类型 | 描述 |
| -------- | ------ | ----------------------------------------------------------------- |
| sort | string | 排序顺序:asc，desc（默认） |
| order_by | string | 返回按 created_at 或 updated_at 字段排序的数据，默认为 created_at |
:::

## findById - 根据 ID 查询数据

```ts
userRepository.findById(1).then((res) => console.log(res));
```

## updateById - 根据 ID 更新数据

```ts
userRepository.updateById(1, {
  name: "Mary",
  age: 25,
  gender: "female",
});
```

## deleteById - 根据 ID 删除数据

```ts
userRepository.deleteById(1);
```

## deleteAll - 删除所有数据

::: warning
`deleteAll` 方法会删除当前对应 Issue 下所有数据，请谨慎使用。
:::

```ts
userRepository.deleteAll();
```
