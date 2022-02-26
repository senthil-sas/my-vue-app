import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: () => import('../views/login.vue') },
  {
    path: '/dashboard', name: "dashboard", component: () => import('../views/dashboard.vue'),
    children: [
      { path: '/employee', name: 'employee', component: () => import('../views/employee.vue') },
      { path: '/customer', name: 'customer', component: () => import('../views/customer.vue') },
      { path: '/project', name: 'project', component: () => import('../views/project.vue') },
      { path: '/task', name: 'tasks', component: () => import('../views/task.vue') },
      { path: '/team', name: 'teams', component: () => import('../views/team.vue') },
      { path: '/report', name: 'reports', component: () => import('../views/reports.vue') },
      { path: '/task1', name: 'tasks1', component: () => import('../views/task1.vue') },
      { path: '/kanbanBoard', name: 'kanbanBoard', component: () => import('../views/kanbanBoard.vue') },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
