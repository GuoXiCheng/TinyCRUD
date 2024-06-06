# 如何构建运行

## clone 代码

```bash
git clone git@github.com:GuoXiCheng/TinyCRUD.git
```

## 安装依赖

```bash
cd TinyCRUD

npm install
```

## 运行测试

```bash
npm run test
```

默认情况下，为了保证测试不受测试环境干扰，测试会在模拟环境下执行。如果需要使用真实网络请求 API 执行测试，需要在项目根目录下新建.env 文件，内容如下：

::: warning
如果设置 `USE_API = true`，在执行测试过程中会发起真实的网络请求，因此测试是否通过不仅取决于代码是否正确，还取决于你的网络环境是否正常和配置是否正确。
:::

```makefile
USE_API=true # 是否使用真实网络环境
TEST_ENCRYPT_KEY=YourEncryptKey

# Gitee
TEST_GITEE_TOKEN=Your Gitee Token
TEST_GITEE_OWNER=Your Gitee Owner
TEST_GITEE_REPO=Your Gitee Repo
TEST_GITEE_NUMBER=Your Gitee Issue Number

# Github
TEST_GITHUB_TOKEN=Your Github Token
TEST_GITHUB_OWNER=Your Github Owner
TEST_GITHUB_REPO=Your Github Repo
TEST_GITHUB_NUMBER=Your Github Issue Number

# Gitlab
TEST_GITLAB_TOKEN=Your Gitlab Token
TEST_GITLAB_PROJECT_ID=Your Gitlab Project ID
TEST_GITLAB_NUMBER=Your Gitlab Issue Number

```

## 构建

```bash
npm run build
```
