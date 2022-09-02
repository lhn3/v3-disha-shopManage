<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside>
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
.board{
  background-color: #1c6ca1;
}
</style>