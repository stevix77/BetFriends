import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FriendsView from '../views/FriendsView.vue'
import CreateBetView from '../views/CreateBetView.vue'
import CompleteBetView from '../views/CompleteBetView.vue'
import ProofView from '../views/ProofView.vue'

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
      path: '/complete/:betId',
      name: 'complete',
      props: true,
      component: CompleteBetView
    },
    {
      path: '/proof/:betId',
      name: 'proof',
      props: true,
      component: ProofView
    }
  ]
})

export default router
