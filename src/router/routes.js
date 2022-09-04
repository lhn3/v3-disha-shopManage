import NotFound from '@/pages/NotFound/NotFound.vue'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Goods from '@/pages/GoodManagement/Goods/Goods.vue'
import Category from '@/pages/GoodManagement/Category/Category.vue'
import Skus from '@/pages/GoodManagement/Skus/Skus.vue'
import Coupon from '@/pages/GoodManagement/Coupon/Coupon.vue'

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
        }
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

//动态路由
export const asyncRouters = [
    {
        path: '/goods/list',
        name: 'goods',
        component: Goods,
        meta:{
            title:'商品管理'
        }
    },    {
        path: '/category/list',
        name: 'category',
        component: Category,
        meta:{
            title:'分类管理'
        }
    },    {
        path: '/skus/list',
        name: 'skus',
        component: Skus,
        meta:{
            title:'规格管理'
        }
    },    {
        path: '/coupon/list',
        name: 'coupon',
        component: Coupon,
        meta:{
            title:'优惠劵管理'
        }
    },
]