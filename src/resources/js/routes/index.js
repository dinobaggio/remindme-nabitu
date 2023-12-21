import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import Login from '../pages/login.vue'
//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router