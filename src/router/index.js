import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/Home'

Vue.use(VueRouter)

const routes = [{ path: '/', name: 'home', component: HomePage }]

export const router = new VueRouter({
  mode: 'history',
  routes
})
