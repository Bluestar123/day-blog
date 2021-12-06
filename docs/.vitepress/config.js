module.exports = {
  title: '测不准的博客',
  description: '学习记录，欢迎指正',
  base: '/day-blog/dist/',
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/css/index.css', // 图片放在 public 文件夹下
      }
    ]
  ],
  themeConfig: {
    repo: 'Bluestar123/day-blog/tree/master',
    // 头部导航
    nav: [
      {text: '首页', link: '/'},
      {text: '关于', link: '/about/'},
      {text: '前端技术', items: [
        { text: 'TS', link: '/ts/basics', activeMatch: '^/ts/' },
        { text: 'Japanese', link: '/language/japanese/' }
      ]}
    ],
    // 侧边导航
    sidebar: {
      '/ts/': getTsSidebar()
    }
    // sidebar: [
    //   {text: '我的', link: '/mine/'},
    // ]
  },
  markdown: {
    config: (md) => {
      const {
        demoBlockPlugin
      } = require('../../demoblock')//require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        lang: ['js', 'ts', 'vue', 'css']
      })
    }
  }
}


// ts 侧边栏
function getTsSidebar() {
  return [
    {
      text: '基础知识',
      children: [
        { text: '基础', link: '/ts/basics' },
        { text: '内置类型', link: '/ts/inside-type' },
      ]
    },
    {
      text: '日常总结',
      link: '/ts/daily'
      // children: [
      //   { text: '基础', link: '/ts/daily' }
      // ]
    },
    {
      text: '练习题',
      children: [
        {
          text: '字符串',
          // link: '/ts/tests/string',
          // activeMatch: '^/ts/tests',
          children: [
            {
              text: '字符串练习题',
              link: '/ts/tests/string',
            },
            {
              text: '答案',
              link: '/ts/tests/string-answer',
            }
          ]
        }
      ]
    },
    {
      text: '日常总结',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' }
      ]
    }
  ]
}