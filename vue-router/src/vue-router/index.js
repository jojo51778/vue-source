//入口文件
//导出VueRouter类，install方法供Vue.use(VueRouter)使用
import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
class VueRouter {
  constructor(options) {
    // match处理属性结构，扁平化处理
    this.matcher = createMatcher(options.routes || [])

    // base 基类，3种路由方式
    this.history = new HashHistory(this)
  }

  match(location) {
    return this.matcher.match(location)
  }
  // 初始化方法，app为Vue最顶层实例
  init(app) {
    const history = this.history
    const setupHashListener = () => { //跳转成功的回调
      history.setupListener() //监听路由的变化 父
    }
    history.transitionTo( // 跳转的方法 父
      history.getCurrentLocation(), // 获取当前路径的方法 子
      setupHashListener
    )
  }
}
VueRouter.install = install

export default VueRouter