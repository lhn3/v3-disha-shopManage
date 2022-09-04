<template>
  <el-container style="overflow: hidden">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside class="aside" :width="!$store.state.isFoldMenu ? '250px' : '64px'">
        <Menu/>
      </el-aside>
      <el-main>
        <div class="board">面包屑</div>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

</script>

<style scoped lang="less">
.aside{
  transition: all 0.5s;
}
.board{
  background-color: #1c6ca1;
}
</style>