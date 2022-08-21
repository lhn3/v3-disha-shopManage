import NotFound from '@/pages/NotFound/NotFound.vue'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import About from "@/pages/About/About.vue";

export const routes = [
    {
        path: '/',
        redirect: { name: 'home' }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta:{
            title:'首页'
        },
        children: [
          { path: '/home/about', name: 'about', component: About, meta: {title: '关于'}}
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            title:'登录'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta:{
            title: 'Not Found'
        }
    },
]