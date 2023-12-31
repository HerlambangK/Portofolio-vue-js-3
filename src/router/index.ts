import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Portofolio from '../views/Portofolio.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/portofolio',
    name: 'Portofolio',
    component: Portofolio
  },
  {
    path: '/pengaduan',
    name: 'Pengaduan',
    component: Pengaduan
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }

  // { path: "/:path(.*)", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
