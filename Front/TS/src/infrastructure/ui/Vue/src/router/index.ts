import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FriendsView from '../views/FriendsView.vue'
import CreateBetView from '../views/CreateBetView.vue'
import CompleteBetView from '../views/CompleteBetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/complete/:betId',
      name: 'complete',
      props: true,
      component: CompleteBetView
    }
  ]
})

export default router
