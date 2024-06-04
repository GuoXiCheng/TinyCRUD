# Applying Encryption

When the `useEncrypt` field is set to `true`, TinyCRUD will encrypt the data before storing it in an Issue and decrypt it when reading from the Issue.

Therefore, when `useEncrypt` is `true`, you must implement the encryption function `encryptFn` and the decryption function `decryptFn`. TinyCRUD will use these two functions to encrypt and decrypt the data.

For example, to encrypt and decrypt using `crypto-js`, you can use the following code:

```javascript{12}
import CryptoJS from "crypto-js";

const GithubRequest = createRequest({
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

When useEncrypt is set to false, the encryption and decryption functions encryptFn and decryptFn will be ignored.

Therefore, you can choose to use encryption or not based on the environment, for example:

```js
const GithubRequest = createRequest({
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
