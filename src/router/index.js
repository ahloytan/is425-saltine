import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import DashboardCharts from '../views/DashboardCharts.vue'
import Projects from '../views/Projects.vue'
import Project from '../views/Project.vue'
import Records from '../views/Records.vue'
import ChatGPT from '../views/ChatGPT.vue'
import SelfServe from '../views/SelfServe.vue'
import Collaboration from '../views/Collaboration.vue'
import Sidebar from '../components/Sidebar.vue'

const routes = [
  {
    path: '/',
    name: 'BaseLogin',
    component: LoginPage,
    meta: { requiredAuthorization: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiredAuthorization: false }
  },
  {
    path: '/superadmin',
    component: Sidebar,
    children: [
      {
        path: '/dashboard',
        name: 'DashboardCharts',
        component: DashboardCharts,
      },
      {
        path: '/projects',
        name: 'Projects',
        component: Projects,
      },
      {
        path: '/project/:slug',
        name: 'Project',
        component: Project,
        meta: {
          requiresAuth: true,
          title: 'Project',
        },
      },
      {
        path: '/records',
        name: 'Records',
        component: Records,
      },
      {
        path: '/generate',
        name: 'ChatGPT',
        component: ChatGPT,
      },
      {
        path: '/self-serve',
        name: 'SelfServe',
        component: SelfServe,
      },
      {
        path: '/collaboration',
        name: 'Collaboration',
        component: Collaboration,
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => { 
  next()
})


export default router