import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')

  }, {

  path: '/profile',
  name: 'Profile',
  component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')

}, {

  path: '/tabInicial',
  name: 'TabelaInicial',
  component: () => import(/* webpackChunkName: "about" */ '../views/TabBabys.vue')

},

{

  path: '/nascimentos',
  name: 'Nascimentos',
  component: () => import(/* webpackChunkName: "about" */ '../views/Registo.vue')

},
{

path: '/historico',
name: 'Historico',
component: () => import(/* webpackChunkName: "about" */ '../views/historico.vue')

},

{

path: '/infoBebe',
name: 'InfoBebe',
component: () => import(/* webpackChunkName: "about" */ '../views/InfoBebe.vue')

},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
