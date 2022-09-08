<template>
    <el-row :gutter="20" class="mt-5" >
      <el-col :span="12">
        <el-card shadow="hover" style="cursor: pointer">
          <template #header>
            <div class="cart-title">
              <span>订单统计</span>
              <div class="tags">
               <el-check-tag v-for="item in state" class="tag" :checked="checked === item.value" @change="onChange(item.value)" :key="item.value">
                 {{ item.text }}
               </el-check-tag>
              </div>
            </div>
          </template>
          <div ref="echartsRef" id="echarts" style="width: 100%;height: 300px">
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" style="cursor: pointer">
          <div class="cart-value">
            2222
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script setup>
import {getHomeEcharts} from "@/request/api/manager.js";
import {onMounted, ref, onBeforeUnmount} from "vue";
import {ElMessage} from "element-plus";
import * as echarts from 'echarts';
import {useResizeObserver} from '@vueuse/core'

const state = [
  {text: '近一个月',value: 'month'},
  {text: '近一周',value: 'week'},
  {text: '近24小时',value: 'hour'}
]

const echartsRef = ref(null)
const checked = ref('week')
let myChart = null

onMounted(  async ()=>{
  //声明注册
  const chartDom = document.getElementById('echarts');
  myChart = echarts.init(chartDom);
  getInfo('week')
})

//请求数据
const getInfo = async (type) => {
  myChart.showLoading()
  const res = await getHomeEcharts({type})
  if (res.code !== 200){
    return ElMessage.error(res.msg + '!')
  }
  resetEcharts(res.data.x,res.data.y)
  myChart.hideLoading()
}

//重载echarts数据
const resetEcharts = (x,y) => {
  let option = {
    xAxis: {
      type: 'category',
      data: x.reverse()
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: y.reverse(),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  myChart.setOption(option)
}

//改变数据
const onChange = (type) => {
  if (checked.value === type) return
  checked.value = type
  getInfo(type)
}

//销毁echarts
onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})

//窗口改变大小时执行
useResizeObserver(echartsRef,() => myChart.resize())

</script>

<style scoped lang="less">
  .cart-title{
    @apply text-sm;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    .tags{
      .tag{
        margin-right: 10px;
      }
    }
  }
</style>