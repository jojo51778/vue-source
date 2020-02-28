export function createRoute(record, location) {
  let res = [] //存放匹配路径
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res
  }
}

function runQueue(queue, iterator, callback) {
  function step(index) {
    if(index === queue.length) return callback() //调用路由更新逻辑
    let hook = queue[index]
    iterator(hook, () => step(index+1))
  }
  step(0)
}
class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    })
  }
  transitionTo(location, callback) {
    // 根据路径获得对应组件
    let r = this.router.match(location)

    if (location == this.current.path && r.matched.length == this.current.matched.length) {
      return // 为了确保不会多次触发更新
    }
    // 在更新路径之前 需要执行刚才的那些钩子
    callback && callback()

    let queue = this.router.beforeEachs
    const iterator = (hook, next) => {
      hook(this.current, r, next)
    }
    runQueue(queue, iterator, () => {
      this.updateRoute(r, callback)
    })
  }
  updateRoute(r, callback) {
    this.current = r // 将当前路径进行更新
    this.cb && this.cb(r) //告诉_route属性来更新，更新后，视图会重新渲染
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }
  listen(cb) {
    this.cb = cb
  }
}

export default History