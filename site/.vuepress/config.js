const { join } = require('path')
const webpack = require('webpack')

const env = Object.assign({}, process.env)

// vueress中 base默认为`/`
env.SITE_ROOT = env.SITE_ROOT || '/'

// vuepress中 为避免用户容易漏掉末尾的`/` 如`/sorry` 导致非预期
// 这里我们强制帮其补上 => `/sorry/` 另一种场景的实际需求也非常少
env.SITE_ROOT = env.SITE_ROOT.replace(/\/*$/, '/')

// 可指定server路径 默认同site路径
env.SERVER_ROOT = env.SERVER_ROOT || env.SITE_ROOT

const defineEnv = Object.keys(env).reduce((acc, k) => {
  acc[`process.env.${k}`] = JSON.stringify(env[k])
  return acc
}, {})

module.exports = {
  dest: join(__dirname, '../dist'),
  base: env.SITE_ROOT,
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
    plugins: [
      new webpack.DefinePlugin(defineEnv)
    ],
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
          },
          {
            text: '随机广场',
            link: '/random/'
          }
        ],
        sidebar: {
          '/make/': [
            {
              title: '制作动图',
              collapsable: false,
              children: [
                'wuleihong',
                'moshou',
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
