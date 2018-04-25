<img width="600" src="pic01.png">

*Inspired by [xtyxtyx/sorry](https://github.com/xtyxtyx/sorry) and [vuejs/vuepress](https://github.com/vuejs/vuepress)*

- [x] VuePress
- [x] Element-UI 1.x
- [x] Koa 2.x
- [x] FFmpeg
- [x] PM2
- [ ] Docker

### Setup and develop (MacOS)

``` sh
brew install ffmpeg --with-libass

# SorryPress/server >
npm install

# SorryPress/site >
npm install

# SorryPress >
npm run dev
# 访问 http://localhost:8080/
```

### Deloy

``` sh
npm i -g pm2 npm-run-all

# SorryPress >
npm start
# 访问 http://localhost:7890/

# 也可以指定一些url配置
PORT=9999 npm start
SITE_ROOT=/sorry/ npm start
SERVER_ROOT=http://abc.com/ npm start
```

### Notes

- VuePress支持async/await进行中 [vuejs/vuepress#124](https://github.com/vuejs/vuepress/issues/124)
- 只使用了Element-UI 1.x，因为2.x在VuePress中报错，还没解决 [vuejs/vuepress#80](https://github.com/vuejs/vuepress/pull/80)

``` css
/* 定制SorryPress的logo */
.hero-2 {
  position: absolute;
  transform: rotateX(-21deg) rotateY(-20deg) rotateZ(-17deg);
}
```

``` sh
# 给gif加入字幕
ffmpeg -i wangjingze.gif \
  -vf "ass=wangjingze.ass" \
  -y out.gif
```
