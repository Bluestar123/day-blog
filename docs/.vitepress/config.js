module.exports = {
  title: '测不准的博客',
  description: '随便写写，欢迎指正',
  base: '/day-blog/dist/',
  // head: [
  //   [
  //     'link',
  //     {
  //       rel: 'icon',
  //       href: '/img', // 图片放在 public 文件夹下
  //     }
  //   ]
  // ],
  themeConfig: {
    repo: 'vuejs/vitepress',
    // 头部导航
    nav: [
      {text: '首页', link: '/'},
      {text: '关于', link: '/about/'},
      {text: '前端框架', items: [
        { text: 'Chinese', link: '/language/chinese/' },
        { text: 'Japanese', link: '/language/japanese/' }
      ]}
    ],
    // 侧边导航
    sidebar: [
      {text: '我的', link: '/mine/'}
    ]
  }
}