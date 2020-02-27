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
      } else {
        // 子组件上都有一个_routerRoot属性可以获取到最顶层的根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}

export default install