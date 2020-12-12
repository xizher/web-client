# 基于GlobeLand30的辅助地理课堂教学系统涉及与实现

[TOC]

## 技术路线

- vue
- vite
- typescript
- arcgis-js-api

## 2020年12月12日

### 一、sass集成

First,

```bash
npm install sass sass-loader --save-dev
```

（ beacause nvm???）But,

![](.\README\images\2020-12-12_094530.png)

Delete fibers in node_modules and then reinstall

```bash
npm install fibers --save-dev
```

Ok!

### 二、typescript集成

```bash
npm install typescript --save-dev
```

when sase, to fix with:

![](.\README\images\2020-12-12_105307.png)

```typescript
// create source.d.ts in .src/ and use
declare const React: string
```

or

```json
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "jsx": "preserve", // <= "jsx": "react"
    // ...
  }
  // ...
}
```



### 三、eslint集成

```bash
npm install --save-dev eslint eslint-plugin-vue
```

```bash
npm i --save-dev @typescript-eslint/eslint-plugin typescript @typescript-eslint/parser
```

```js
// .eslintrc.js
module.exports = {
  // ...
  'parser': '@typescript-eslint/parser',
  // ...
  'extends': [
    // ...
    'plugin:@typescript-eslint/recommended',
    // ...
  ]
  // ...
}
```

```json
// settings.json in vscode
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "vue",
  "typescript",
  "typescriptreact"
],
"files.associations": {
  "*.vue": "vue"
}
```

### 四、构建压缩打包方式

error in version 7

```bash
npm install --save-dev compression-webpack-plugin@6
```

```js
// vue.config.js
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // ...
	configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
	}
  // ...
}
```

And then, start nginx gzip

```
// config file

# 开启和关闭gzip模式
gzip on;

# gizp压缩起点，文件大于1k才进行压缩
gzip_min_length 1k;

# 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
gzip_buffers 4 16k;

# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.1;

# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 2;

# 需要压缩的文件mime类型
gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;

# nginx做前端代理时启用该选项，表示无论后端服务器的headers头返回什么信息，都无条件启用压缩
gzip_proxied expired no-cache no-store private auth;

# 不启用压缩的条件，IE6对Gzip不友好，所以不压缩
gzip_disable "MSIE [1-6]\.";
```

### 五、cdn资源配置

```js
// vue.config.js
const cdn = {
  css: [
    
  ],
  js: [
    './libs/vue/vue.v3.0.0.js',
    './libs/vue/vue-router.v4.0.0-rc.6.js',
  ]
}

module.exports = {
  // ...
  configureWebpack: {
    // ...
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
    }
  },
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'GLC30辅助地理课堂教学系统',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: cdn
    }
  },
}
```

```html
// index.html
<!-- in <head></head> -->
<% for (let i in htmlWebpackPlugin.options.cdn.css) { %>
  <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
<% } %>
<!-- after <div id="app"></div> -->
<% for (let i in htmlWebpackPlugin.options.cdn.js) { %>
  <script
    type="text/javascript"
    src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
  ></script>
<% } %>
```

### 六、其他

ArcGIS API for JavaScript .d.ts 智能题型

```bash
npm install --save-dev @types/arcgis-js-api
```

