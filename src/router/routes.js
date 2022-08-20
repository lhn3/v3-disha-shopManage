import NotFound from '@/pages/NotFound/NotFound.vue'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'

export const routes = [
    {
        path: '/',
        redirect: { name: 'home' }
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]