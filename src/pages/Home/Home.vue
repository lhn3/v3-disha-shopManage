<template>
<!--  <el-button type="warning" @click="logout">退出登录</el-button>-->
  <el-container>
    <el-header>头部</el-header>
    <el-container>
      <el-aside>侧边</el-aside>
      <el-main>
        <div>面包屑</div>
        <router-view />
      </el-main>
    </el-container>
    </el-container>
</template>

<script setup>
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {ElMessage} from "element-plus";
import { messageBox } from '@/utils/message'
import {loginOut} from "@/request/api/manager";

const store = useStore()
const router = useRouter()

const logout = async () => {
  let  res = await messageBox('确认退出登录?')
  if (!res)  return
  let loginOutRes = await loginOut()
  if (loginOutRes.code !== 200) {
    return ElMessage.error(loginOutRes.msg)
  }
  ElMessage.success(loginOutRes.data)
  store.dispatch('manager/loginOutAction')
  router.replace('/login')
}
</script>

<style scoped>

</style>