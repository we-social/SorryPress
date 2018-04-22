# SorryPress

- [x] VuePress
- [x] Element-UI 1.x
- [x] Koa 2.x
- [x] FFmpeg

*Inspired by [xtyxtyx/sorry](https://github.com/xtyxtyx/sorry) and [vuejs/vuepress](https://github.com/vuejs/vuepress)*

### ToubleShootings

- 只使用了Element-UI 1.x，因为2.x在VuePress中报错，还没解决

``` css
.hero-2 {
  position: absolute;
  transform: rotateX(-21deg) rotateY(-20deg) rotateZ(-17deg);
}
```

- Sorry开源元祖 https://github.com/xtyxtyx/sorry
- Create timed subtitles/text on GIF https://imagemagick.org/discourse-server/viewtopic.php?t=25265
- Brew安装ImageMagick
- Add new font for ImageMagick on Mac OS X and Ubuntu http://www.bigbing.net/2016/08/11/add-new-font-imagemagick-mac-osx/
- 用软件LiceCap来自由录制Gif作为模板

``` sh
## 不大确定 发现重启就好了 可以ass 待考究
brew install libass
brew install ffmpeg --with-libass
```

``` sh
ffmpeg -i wangjingze.gif \
  -vf "ass=wangjingze.ass" \
  -y out.gif
```
