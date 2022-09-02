<template>
  <div class="f-menu">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        class="menu"
        text-color="#fff"
    >
      <template v-for="(item, index) in menuList" :key="item.name">
        <el-sub-menu :index="index" v-if="item.child && item.child.length > 0">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(i, indey) in item.child" :index="`${index}-${indey}`" :key="item.name">
            <el-icon><component :is="i.icon" /></el-icon>
            <router-link :to="i.frontpath">{{ i.name }}</router-link>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="index" v-else>
          <el-icon><component :is="item.icon" /></el-icon>
          <router-link :to="item.frontpath">{{ item.name }}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuList = ref([])
menuList.value = [
  {
    name: '后台面板',
    icon: 'help',
    child: [
      {
        name: '主控台',
        icon: 'home-filled',
        frontpath: '/'
      },
      {
        name: '日志',
        icon: 'home-filled',
        frontpath: '/'
      }
    ]
  },
  {
    name: '1111',
    icon: 'help',
    frontpath: '/'
  },
  {
    name: '2222',
    icon: 'help',
    frontpath: '/'
  }
]
</script>

<style scoped lang="less">
.f-menu{
  width: 250px;
  height: calc(100vh - 60px);
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;
  @apply shadow-md fixd;
  .menu{
    border: none;
    height: 100%;
  }
}

</style>