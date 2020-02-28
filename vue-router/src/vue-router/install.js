import RouterView from './components/router-view'
import RouterLink from './components/router-link'

const install = Vue => {
  // mixin混入，使得router在任何组件都可以使用
  Vue.mixin({
    beforeCreate() {
      // 判断是不是根
      if(this.$options.router) {
        // 保存跟实例
        this._routerRoot = this
        this._router = this.$options.router
        // 路由初始化
        this._router.init(this) //这里this已经是包含router的根实例了
        // 将current属性定义为响应式的，这样稍后更新current 就可以刷新视图了
        // 给当前的实例增加一个_route属性， 取自当前的history中的current
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 子组件上都有一个_routerRoot属性可以获取到最顶层的根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}
export default install