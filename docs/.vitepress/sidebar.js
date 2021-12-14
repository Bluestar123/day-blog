/**
 * 浏览器
 */
export function getBrowserSidebar() {

}



// ts 侧边栏
export function getTsSidebar() {
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
          link: '/ts/tests/string',
          // activeMatch: '^/ts/tests',
          // children: [
          //   {
          //     text: '字符串练习题',
          //     link: '/ts/tests/string',
          //   },
          //   {
          //     text: '答案',
          //     link: '/ts/tests/string-answer',
          //   }
          // ]
        },
        {
          text: '元组',
          link: '/ts/tests/tuple'
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

// 关于侧边栏
export function getAboutSidebar() {
  return [
    {
      text: '博客搭建',
      link: '/about/blog'
      // children: [
      //   { text: '基础', link: '/ts/basics' },
      //   { text: '内置类型', link: '/ts/inside-type' },
      // ]
    },
    {
      text: '关于作者',
      link: '/about/author'
    },
  ]
}

/**
 * react 侧边栏
 */
export function getReactSidebar() {
  return [
    {
      text: '搭配ts',
      link: '/react/ts'
    }
  ]
}

/**
 * Gulp 侧边栏
 */
 export function getGulpSidebar() {
  return [
    {
      text: '搭配ts',
      link: '/gulp/index'
    }
  ]
}

/**
 * 源码阅读
 */
export function getSourceCodeSidebar() {
  return [
    {
      text: '准备',
      link: '/source-code/index'
    }
  ]
}