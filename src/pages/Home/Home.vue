<template>
  home
  <el-button type="warning" @click="logout">退出登录</el-button>
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