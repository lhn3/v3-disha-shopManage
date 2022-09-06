<template>
  <div class="home-info">
    <el-row :gutter="20">
<!--      数据占位-->
      <el-col :span="6" v-for="i in 4" :key="i" v-if="panels.length === 0">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card>
              <template #header>
                <div class="cart-title">
                  <el-skeleton-item variant="text" style="width: 50%;height: 30px" />
                  <el-skeleton-item variant="text" style="width: 10%;height: 30px" />
                </div>
              </template>
              <div class="cart-value" style="line-height: 0">
                <el-skeleton-item variant="text" style="width: 30%;height: 70px" />
              </div>
              <el-divider />
              <div class="cart-bottom">
                <el-skeleton-item variant="text" style="width: 50%;height: 40px" />
                <el-skeleton-item variant="text" style="width: 10%;height: 40px" />
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
<!--      -->

      <el-col :span="6" v-for="item in panels" :key="item.subTitle" v-else>
        <el-card shadow="hover" style="cursor: pointer">
          <template #header>
            <div class="cart-title">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">{{ item.unit }}</el-tag>
            </div>
          </template>
          <div class="cart-value">
            <NumberTo :value="item.value" />
          </div>
          <el-divider />
          <div class="cart-bottom">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getHomeInfo} from "@/request/api/manager.js";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import NumberTo from '@/components/NumberTo.vue'

const panels = ref([])

onMounted(async ()=>{
  const res = await getHomeInfo()
  if (res.code !== 200){
    return ElMessage.error(res.msg + '!')
  }
  panels.value = res.data.panels
  console.log(res.data.panels,'============')
})
</script>

<style scoped lang="less">
  .home-info{
    width: 100%;
    height: 100%;
    padding-top: 10px;
    background-color: #f1f2f5;
    .cart-title{
      @apply text-sm;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
    }
    .cart-value{
      @apply text-4xl font-bold text-gray-500;
      line-height: 70px;
    }
    .cart-bottom{
      @apply text-sm text-gray-500;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
    }
  }
</style>