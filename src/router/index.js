import Vue from 'vue'
import Router from 'vue-router'
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

Vue.use(Router)

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
    }
  ]

// 设置keepAlive是默认不需要的
for(let item of routes) {
  if (!item.meta) {
    item.meta = { keepAlive: false }
  }
}

export default new Router({
  routes: routes
})
