import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render(h) {return <h1>这是 about/a</h1>}
        }
      },
      {
        path: 'b',
        component: {
          render(h) {return <h1>这是about/b</h1>}
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((from, to, next) => {
  console.log(1)
  setTimeout(() => {
    next()
  },1000)
})

router.beforeEach((from, to, next) => {
  console.log(2)
  setTimeout(() => {
    next()
  },1000)
})

export default router
