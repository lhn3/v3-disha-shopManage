import NotFound from '@/pages/NotFound/NotFound.vue'
import Home from '@/pages/Home/Home.vue'

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
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]