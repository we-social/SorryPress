import ElementUI from 'element-ui'

// element 2.x el-input 在vuepress中会报错
// import 'element-ui/lib/theme-chalk/index.css'; // element 2.x
import 'element-ui/lib/theme-default/index.css'; // element 1.x

// Allow injecting Vue, app, router
// https://github.com/vuejs/vuepress/pull/80
export default ({
  Vue
}) => {
  Vue.use(ElementUI)
}
