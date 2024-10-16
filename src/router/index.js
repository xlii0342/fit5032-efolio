import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import { ref } from 'vue'
import GetBookCount from '@/views/GetBookCount.vue'

const isAuthenticated = ref(false)  

const routes = [

  {
    path: '/login',  
    name: 'Login',
    component: LoginView
  },

  {
    path: '/about',
    name: 'About',
    component: AboutView,
    
  
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/firesignup',
    name: 'FirebaseSignup',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) next({ name: 'Login' })  
      else next()
    }
  },
  {
    path: '/getbookcount',
    name: 'getbookcount',
    component: GetBookCount
  },

  {
    path: '/:catchMatch(.*)*',  
    redirect: { name: 'Home' }  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { isAuthenticated }
export default router
