<template>
  <div  class="f-header">
    <span>
      <el-icon><Promotion /></el-icon>
      西兰花🥦
    </span>
    <el-icon><Fold /></el-icon>

    <div>
      <el-icon><Refresh /></el-icon>
      <el-icon><FullScreen /></el-icon>
      <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" :src="$store.state.manager.avatar" />
      用户名
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
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
.f-header {
  @apply fixed top-0 left-0 right-0 z-60 bg-indigo-700 text-light-50 flex items-center shadow;
  height: 64px;
}
.logo{
  width: 250px;
  @apply flex justify-center items-center font-sans text-xl font-thin text-indigo-100;
}
.f-header .icon-btn{
  @apply flex justify-center items-center;
  height: 64px;
  width: 42px;
  cursor: pointer;
}
.f-header .icon-btn:hover{
  @apply bg-indigo-600;
}
.f-header .dropdown{
  height: 64px;
  @apply flex justify-center items-center text-indigo-50 mx-5;
  cursor: pointer;
}
</style>