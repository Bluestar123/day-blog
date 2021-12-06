## 学习地址

- 官方文档：https://vitepress.vuejs.org/
- 掘金讲解：https://juejin.cn/post/6965510644007665671#heading-48

## 创建

1. 创建自己的项目目录

```shell
mkdir blog-vitepress
cd blog-vitepress
```

2. 初始化 `package.json`, 安装 `vitepress`

```shell
npm init -y
npm i -D vitepress
```

3. 将 `vitepress` 执行命令添加到执行脚本中

```json
"scripts": {
  "dev": "vitepress dev docs --open",
  "build": "vitepress build docs",
  "serve": "vitepress serve docs"
}
```

4. 根目录创建 `docs` 目录，创建第一个 `md` 文件（网站首页的配置和内容），可以命令行活在文件中手动创建

```shell
mkdir docs
echo '# Hello World' > docs/index.md
```

5. 启动项目
```shell
npm run dev
```

## 项目配置

添加一些导航到我们的网站侧边栏和导航栏。创建一个配置文件，在docs中新建一个 `.vitepress` 文件夹，里面创建一个 `config.js` 文件

```js
// vitepress/config.js
module.exports = {
  title: "我的博客",// 网站标题
  description: '我的vitepress博客.', //网站描述
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  // lang: 'en-US', //语言
  // 网页头部配置，引入需要图标，css，js
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/img/linktolink.png',//图片放在public文件夹下
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    repo: 'vuejs/vitepress', // 你的 github 仓库地址，网页的右上角会跳转
    //   头部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' },
    ],
    //   侧边导航
    sidebar: [
      { text: '我的', link: '/mine/' }
    ]
  }
}
```

首页结构(也可以直接用普通的 markdown 格式)
```js
// docs/index.md
---
home: true
heroAlt: Logo image
heroText: Welcome!
tagline: Hero subtitle
actionText: Get Started
actionLink: /ts/basics
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VitePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2019-present Evan You
---
```
![image](/public/img/about/blog-index.jpg)

项目结构

```js
vitepress
    │
    ├─── docs
    │     │
    │     ├── .vuepress
    │     │     └── config.js
    │     ├── public
    │     ├── about
    │     │     └── index.md
    │     ├── mine
    │     │     └── index.md
    │     └── index.md
    └── package.json
```

::: tip
头部导航下拉
```js
nav: [
  {text: '前端技术', items: [
    { text: 'TS', link: '/ts/basics', activeMatch: '^/ts/' },
    { text: 'vue', link: '/skills/vue/' }
  ]}
],
```
:::


::: tip
头部导航和侧边栏关联
```js
nav: [
  {text: '前端技术', items: [
    { text: 'TS', link: '/ts/basics', activeMatch: '^/ts/' },
    { text: 'vue', link: '/skills/vue/' }
  ]}
],


sidebar: {
  '/ts/': getTsSidebar()
}

function getTsSidebar() {
  return [
    {
      text: '基础知识',
      children: [
        { text: '基础', link: '/ts/basics' }, // link 和 头部导航的 link 对应， 访问文件为 docs/ts/basics.md 文件
        { text: '内置类型', link: '/ts/inside-type' },
      ]
    },
  ]
}
```
:::


## 部署 github pages
1. 在 `docs/.vitepress/config.js` 中设置正确的base。
- 如果要部署到 `https://<USERNAME>.github.io/`，则可以省略 `base`，因为它默认为 `“/”`。
- 如果您正在部署到 `https://<USERNAME>.github.io/<REPO>/`，例如，您的存储库位于 `github.com/<REPO>/`，然后将 `base` 设置为 `/<REPO>/`


::: tip
vitepress 默认打包后的 dist 目录放在 .vitepress/dist/ 下，小编这里只是设置了 github pages（读者可自行百度查找），写了个脚本把打包完后的 dist 目录移到了根目录下，git push 到仓库中，直接通过 github 地址访问，仅供参考。
:::



## 代码展开

1. 安装 `vitepress-theme-demoblock` 插件, [github 地址](https://github.com/xinlei3166/vitepress-theme-demoblock)

```shell
npm install -D vitepress-theme-demoblock
# or
yarn add -D vitepress-theme-demoblock
```

2. 配置 `config.js`

```js
module.exports = {
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin)
    }
  }
}
```

3. 注入主题与插件
在 `docs/.vitepress/theme/index.ts` 中写入如下代码，其中 `register-components.js` 不需要自己创建，在 `package.json` 中注入脚本，执行脚本自动生成在 `docs/.vitepress/theme` 目录下

```json
"scripts": {
  "register:components": "vitepress-rc"
}
```
执行 `npm run register:components`

```js
// docs/.vitepress/theme/index.ts

// 导入vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default'

// 导入主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 想引入全局自己的 css 文件，也可以在这里引入

// 导入插件的主题
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    registerComponents(app)
  }
}
```
4. 使用
在需要展示的 `demo` 中的 `index.md` 文件中使用特定的语法包裹代码，可以自动生成组件 `demo` 展示
```vue
# Button 按钮

:::demo 使用`type`，`plain`，`round`来定义 Button 的样式

```vue
<template>
  <my-button style="color: red">按钮1</my-button>
  Middle
  <my-button type="size">按钮2</my-button>
  Large
  <my-button>按钮3</my-button>
  Disabled
  <my-button disabled>按钮4</my-button>
</template>
```
:::





::: tip
默认支持 `vue` 语法， 想修改的话需要修改配置：
```js
md.use(demoBlockPlugin, {
  lang: 'ts'
})
```

但是这里有个限制，智能识别一种语法结构，想到会有 js、 ts、 json 等多种语法，所以改了下解析结构，改成了数组，大家可以看下我的 github 上的写法
:::

