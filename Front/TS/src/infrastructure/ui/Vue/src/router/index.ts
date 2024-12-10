import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FriendsView from '../views/FriendsView.vue'
import CreateBetView from '../views/CreateBetView.vue'
import CompleteBetView from '../views/CompleteBetView.vue'
import SignInView from '../views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bets/new',
      name: 'create-bet',
      component: CreateBetView,
      meta: { requiresAuth: true }
    },
    {
      path: '/complete/:betId',
      name: 'complete',
      props: true,
      component: CompleteBetView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    }
  ]
})

export default router
