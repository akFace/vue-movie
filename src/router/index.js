import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import Movie from '@/components/Movie'
import Tv from '@/components/Tv'
import User from '@/components/User'
import MovieDetail from '@/components/MovieDetail'
import Search from '@/components/Search'
import About from '@/components/About'
import History from '@/components/History'
import Favorite from '@/components/Favorite'
import Settings from '@/components/Settings'
import test from '@/components/test'

Vue.use(VueRouter)

const routes =  [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { keepAlive: true }
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie,
      meta: { keepAlive: true }
    },
    {
      path: '/tv',
      name: 'Tv',
      component: Tv,
      meta: { keepAlive: true }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { keepAlive: true }
    },
    {
      path: '/movie/detail/:movie_id',
      name: 'MovieDetail',
      component: MovieDetail,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: { keepAlive: true }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/history',
      name: 'History',
      component: History,
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    }
  ]

// 设置keepAlive是默认不需要的
for(let item of routes) {
  if (!item.meta) {
    item.meta = { keepAlive: false }
  }
}



// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: routes
})


export default router
