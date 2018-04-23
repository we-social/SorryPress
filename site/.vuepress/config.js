const { join } = require('path')

module.exports = {
  dest: join(__dirname, '../dist'),
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'SorryPress',
      description: 'Sorry动图 VuePress版'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@story': join(__dirname, '../../server/story'),
        '@utils': join(__dirname, 'utils'),
        '@public': join(__dirname, 'public')
      }
    }
  },
  themeConfig: {
    repo: 'fritx/SorryPress',
    // editLinks: true,
    docsDir: 'site',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: '制作动图',
            link: '/make/'
          }
        ],
        sidebar: {
          '/make/': [
            {
              title: '制作动图',
              collapsable: false,
              children: [
                'wangjingze',
                'tuboshu'
              ]
            }
          ]
        }
      }
    }
  }
}
