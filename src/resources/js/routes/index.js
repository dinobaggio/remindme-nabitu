import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import ReminderUpdate from '../pages/reminders/update.vue'
import ReminderCreate from '../pages/reminders/create.vue'
import ReminderDetail from '../pages/reminders/detail.vue'
import Login from '../pages/login.vue'
import Profile from '../pages/profile.vue'
//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/reminders/create',
        name: 'reminders.create',
        component: ReminderCreate
    },
    {
        path: '/reminders/:id',
        name: 'reminders.detail',
        component: ReminderDetail
    },
    {
        path: '/reminders/:id/update',
        name: 'reminders.update',
        component: ReminderUpdate
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router