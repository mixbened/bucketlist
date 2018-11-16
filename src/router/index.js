import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '../components/Home'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashbboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
