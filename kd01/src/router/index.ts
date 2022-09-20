import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/branch_m',
    name: 'branch_m',
    component: () => import('../views/Branch_m.vue')
  },
  {
    path: '/venue_m',
    name: 'venue_m',
    component: () => import('../views/Venue_m.vue')
  },
  {
    path: '/tournament_m',
    name: 'tounrament_m',
    component: () => import('../views/Tournament_m.vue')
  },
  {
    path: '/category_m',
    name: 'category_m',
    component: () => import('../views/Category_m.vue')
  },
  {
    path: '/gameclass_m',
    name: 'gameclass_m',
    component: () => import('../views/Gameclass_m.vue')
  },
  {
    path: '/player_m',
    name: 'player_m',
    component: () => import('../views/Player_m.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
