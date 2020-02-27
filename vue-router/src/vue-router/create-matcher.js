import createRouteMap from './create-route-map'
import { createRoute } from './history/base'

export default function createMatcher(routes) {
  // 将数组扁平化
  // pathList是所有路径的集合，[/ /about /about/a /about/b]
  // pathMap {/: home, /about: about,/about/a: aboutA}
  let {pathList, pathMap} = createRouteMap(routes)
  function addRoute(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  function match(location) { //匹配对应记录
    let record = pathMap[location]
    return createRoute(record, {
      path: location
    })
  }
  return {
    addRoute,
    match
  }
}