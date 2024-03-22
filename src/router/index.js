import Vue from 'vue'
import VueRouter from 'vue-router'

// paginas e componentes
import LandingPage from '../views/LandingPage'
import Login from '../views/Login'
import Application from '../views/Application'
import Dashboard from '../views/Application/Dashboard'
import Products from '../views/Application/Products'
import ProductView from '../views/Application/Products/view'
import Stores from '../views/Application/Stores'
import StoreView from '../views/Application/Stores/view'
import Notes from '../views/Application/Notes'
import NoteView from '../views/Application/Notes/view'
import NoteCreate from '../views/Application/Notes/create'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/application',
    name: 'Application',
    component: Application,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'products/:id',
        name: 'ProductView',
        component: ProductView
      },
      {
        path: 'stores',
        name: 'Stores',
        component: Stores
      },
      {
        path: 'stores/:id',
        name: 'StoreView',
        component: StoreView
      },
      {
        path: 'notes',
        name: 'Notes',
        component: Notes,
      },
      {
        path: 'notes/create',
        name: 'NoteCreate',
        component: NoteCreate
      },
      {
        path: 'notes/:id',
        name: 'NoteView',
        component: NoteView
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
