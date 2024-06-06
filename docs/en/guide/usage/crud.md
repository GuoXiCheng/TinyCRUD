# CRUD Methods

## detail - Fetch Repository Details

```ts
userRepository.detail().then((res) => console it all and move on.g(res));
```

The returned fields are as follows:

| Field Name   | Type   | Description         |
| ------------ | ------ | ------------------- |
| id           | number | Issue Id            |
| issue_number | string | Issue Number        |
| comments     | number | Number of Comments  |
| created_at   | string | Issue Creation Time |
| updated_at   | string | Issue Update Time   |

::: details Explanation of the comments field
For Github or Gitlab, the comments field shows the actual number. For Gitee, the comments field shows the cumulative number.

For example: after adding 10 data entries and then deleting them, for Github or Gitlab, the comments field will show 0, but for Gitee, it will show 10.
:::

## create - Create a Data Entry

```ts
userRepository.create({
  name: "John",
  age: 30,
  gender: "male",
});
```

## createAll - Create Multiple Data Entries

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

## find - Query Data

```ts
userRepository.find().then((res) => console.log(res));
```

The find method supports passing search parameters, for example:

```ts
userRepository
  .find({
    since: "2021-01-01T00:00:00Z",
    per_page: 10,
    page: 1,
  })
  .then((res) => console.log(res));
```

Supported search parameters vary depending on the storage platform:

::: details Github Query Parameters
|Field Name |Type| Description|
| ------------ | ------ |-------------- |
|since |string| Only return data updated after the specified time, formatted as ISO 8601 `YYYY-MM-DDTHH:MM:SSZ`|
|page| number |Which page of data to return, default is 1|
|per_page |number |How many items per page, default is 30, maximum is 100|
:::

::: details Gitee Query Parameters
|Field Name| Type| Description|
| ------------ | ------ |-------------- |
|since |string| Only return data updated after the specified time, formatted as ISO 8601 `YYYY-MM-DDTHH:MM:SSZ`|
|page |number |The current page number|
|per_page| number |How many items per page, default is 20, maximum is 100|
|order| string |Order of results: asc (default), desc|
:::

::: details Gitlab Query Parameters
|Field Name| Type| Description|
| ------------ | ------ |-------------- |
|sort |string |Sorting order: asc, desc (default)|
|order_by| string| Return data sorted by the created_at or updated_at fields, default is created_at|
:::

## findById - Fetch Data by ID

```ts
userRepository.findById(1).then((res) => console.log(res));
```

## updateById - Update Data by ID

```ts
userRepository.updateById(1, {
  name: "Mary",
  age: 25,
  gender: "female",
});
```

## deleteById - Delete Data by ID

```ts
userRepository.deleteById(1);
```

## deleteAll - Delete All Data

::: warning
`deleteAll` method will delete all the data under the current corresponding Issue, please use it cautiously.
:::

```ts
userRepository.deleteAll();
```
