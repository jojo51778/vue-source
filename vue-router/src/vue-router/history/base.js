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

    callback && callback()
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }
}

export default History