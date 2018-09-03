import Vue from 'vue'
import Router from 'vue-router'
import Trending from '@/components/Trending'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Trending',
    component: Trending
  },
  {
    path: '/search',
    component: Search,
    props: (route) => ({
      query: route.query.q
    })
  }]
})
