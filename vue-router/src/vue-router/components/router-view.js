export default {
  functional: true, //函数式组件，没有状态，没有this
  render(h, {parent, data}) { // data是当前占位符的属性
    let route = parent.$route // $route放在vue的原型上

    let depth = 0 //默认渲染第一个
    while(parent) {
      // $vnode 表示占位符   vnode指渲染vnode   
      if (parent.$vnode && parent.$vnode.data.routerView === 'abc') {
        depth++
      }
      parent = parent.$parent
    }
    data.routerView = 'abc'
    let record = route.matched[depth]
    if(!record) {
      return h()
    }

    return h(record.component, data)
  }
}