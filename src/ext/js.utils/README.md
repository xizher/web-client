# js.utils (js通用函数)
### 调用方式
```bash
npm install crypto-js
```

```js
import { ... } from '*/js.ext'
```

### 函数/方法

| 方法名            | 用途           | 说明             |
| ----------------- | -------------- | ---------------- |
| deepCopy          | 对象深拷贝     | 使用JSON解译方式 |
| guid              | 获取GUID字符串 |                  |
| getRootPath       | 获取当前页面的根地址 |                  |
| randomRange       | 获取指定范围随机数 |                  |
| enCrypto          | 字符串加密 |                  |
| deCrypto          | 字符串解密算法 |                  |
| setCryptoConfig   | Crypto加密解密配置 |                  |
| setCookie         | 设置cookie |                  |
| delCookie         | 删除cookie |                  |
| getCookie         | 获取cookie |                  |
| setLocalStorage   | 设置localStorage |                  |
| getLocalStorage   | 获取localStorage |                  |
| delLocalStorage   | 删除localStorage |                  |
| setSessionStorage | 设置sessionStorage |                  |
| getSessionStorage | 获取sessionStorage |                  |
| delSessionStorage | 删除sessionStorage |                  |
| getGeoLocation    | 获取定位信息 |                  |
| watchGeoLocation | 启动定位监听 |                  |
| isFromMobileBrowser | 判断网页是否通过移动端设备打开 |                  |

### 类

- `RegExpHelper`正则表达检查工具类
  - 静态方法
    - `NON_NEGATIVE_INTEGER`是否为非负整数
    - `POSITION_INTEGER`是否为正整数
    - `EMAIL`是否为email
    - `URL`是否为url