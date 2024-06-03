# 应用加密

当 useEncrypt 字段为 true 时，TinyCRUD 将会对数据进行加密，然后再存储到 Issue 中，当从 Issue 中读取数据时，TinyCRUD 将会对数据进行解密。

因此，当 useEncrypt 字段为 true 时，你必须实现加密函数 encryptFn 和解密函数 decryptFn，TinyCRUD 将会使用这两个函数对数据进行加解密。

例如使用 crypto-js 进行加解密，可以使用如下代码：

```javascript{12}
import CryptoJS from "crypto-js";

const githubRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",

  useEncrypt: true,
  encryptFn: (data: string) => {
    return CryptoJS.AES.encrypt(data, "Your Secret Key").toString();
  },
  decryptFn: (data: string) => {
    return CryptoJS.AES.decrypt(data, "Your Secret Key").toString(
      CryptoJS.enc.Utf8
    );
  },
});
```

当 useEncrypt 字段为 false 时，加解密函数 encryptFn 和 decryptFn 将会被忽略。

因此，你可以根据不同的环境，选择使用加密或者不使用，例如：

```javascript{10}
const githubRequest = createRequest({
  httpLib: "axios",
  httpClient: axios,
  accessToken: "Your Personal Access Token",

  platform: "github",
  owner: "Your Owner",
  repo: "Your Repo",

  useEncrypt: process.env.NODE_ENV === "production",
  encryptFn: (data: string) => {
    return CryptoJS.AES.encrypt(data, "Your Secret Key").toString();
  },
  decryptFn: (data: string) => {
    return CryptoJS.AES.decrypt(data, "Your Secret Key").toString(
      CryptoJS.enc.Utf8
    );
  },
});
```
