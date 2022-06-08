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

  path: '/nascimento',
  name: 'Nascimentos',
  component: () => import(/* webpackChunkName: "about" */ '../views/Registo.vue')

},
{

path: '/historico',
name: 'Historico',
component: () => import(/* webpackChunkName: "about" */ '../views/historico.vue')

},

{

  path: '/profileTecnico',
  name: 'ProfileTecnico>',
  component: () => import(/* webpackChunkName: "about" */ '../views/profileTecnico.vue')

},

{

path: '/infoBebe',
name: 'InfoBebe',
component: () => import(/* webpackChunkName: "about" */ '../views/InfoBebe.vue')

},
{

  path: '/avaliacao1_registo',
  name: 'Avaliacao1',
  component: () => import(/* webpackChunkName: "about" */ '../views/RegAval1.vue')

},
{

  path: '/avaliacao2_registo',
  name: 'Avaliacao2',
  component: () => import(/* webpackChunkName: "about" */ '../views/RegAval2.vue')

},
{

  path: '/avaliacao3_registo',
  name: 'Avaliacao3',
  component: () => import(/* webpackChunkName: "about" */ '../views/RegAval3.vue')

},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
