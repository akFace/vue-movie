import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store';

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
import Login from '@/components/login'
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
      path: '/all/search',
      name: 'Search',
      component: Search,
      meta: { keepAlive: true }
    },
    {
      path: '/user/about',
      name: 'About',
      component: About,
    },
    {
      path: '/user/history',
      name: 'History',
      component: History,
    },
    {
      path: '/user/favorite',
      name: 'Favorite',
      component: Favorite,
    },
    {
      path: '/user/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/user/test',
      name: 'test',
      component: test,
      // 该页面必须登录才能访问
      meta: { needLogin: true }
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login,
    }
  ]


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
  // mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: routes
})


router.beforeEach((to, from, next) => {
    console.log(from);
    // 判断配置的路由中是否存在needLogin存在则做出对应的判断
    if (to.matched.some(record => record.meta.needLogin)) {
        // 从状态管理器中获取登录状态，如果未登录过的跳转至登录页
        if (!store.state.user.is_login) {
            next({
                path: '/user/login',
            });
        } else {
          // 如果已经登录了的就可以访问该页面
            next();
        }
    } else {
        next();
    }
});

export default router
