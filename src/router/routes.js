import NotFound from '@/pages/NotFound/NotFound.vue'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Goods from '@/pages/GoodManagement/Skus/Skus.vue'
import CateGory from '@/pages/GoodManagement/Category/CateGory.vue'
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
        },
        children: [
            {
                path: '/goods/list',
                name: 'goods',
                component: Goods,
                meta:{
                    title:'商品管理'
                }
            },    {
                path: '/cateGory/list',
                name: 'cateGory',
                component: CateGory,
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