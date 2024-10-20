import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import { ref } from 'vue'
import GetBookCount from '@/views/GetBookCount.vue'
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import Navigation from '@/views/Navigation.vue'
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
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  },
  {
    path: '/Navigation',
    name: 'Navigation',
    component: Navigation,
  },
  
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI,
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI,
  },

  {
    path: '/:catchMatch(.*)*',  
    redirect: { name: 'Home' }  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export { isAuthenticated }
export default router
