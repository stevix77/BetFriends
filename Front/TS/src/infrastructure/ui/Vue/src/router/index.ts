import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FriendsView from '../views/FriendsView.vue'
import CreateBetView from '../views/Bets/CreateBetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView
    },
    {
      path: '/bets/new',
      name: 'create-bet',
      component: CreateBetView
    },
    {
      path: '/bets/:id',
      name: 'betdetail',
      component: CreateBetView
    }
  ]
})

export default router
