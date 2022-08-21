import {createRouter,createWebHashHistory} from "vue-router";
import {routes} from "./routes";
import {useCookies} from '@vueuse/integrations/useCookies'
import {ElMessage} from "element-plus";
import nprogress from 'nprogress'

// 暂时保持简单
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    nprogress.start()
    let token = useCookies().get('disha-token')

    // 没有token前往任何页面都被定向到登录页
    if (!token && to.name !== 'login'){
        ElMessage.error('请先登录！')
        next({name: 'login'})
    }
    // 有token前往登录页定向到首页
    if (to.name == 'login' && token){
        next({name: from.name ? from.name : 'home'})
    }
    document.title = to.meta.title ? to.meta.title : ''
    next()
})
router.afterEach(() => {
    nprogress.done()
})