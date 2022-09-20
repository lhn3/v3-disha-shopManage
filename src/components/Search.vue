<template>
  <div class="search" v-if="showSearch">
    <div class="search-item">
      <slot name="search"/>
    </div>
    <div class="search-btn">
      <el-button type="primary" @click="emit('search')">搜索</el-button>
      <el-button @click="emit('reset')">重置</el-button>
    </div>
  </div>
  <div class="button" v-if="showButton">
    <div>
      <slot name="button"/>
    </div>
    <div>
      <el-tooltip effect="dark" content="刷新" placement="top-start">
        <el-button type="text" style="font-size: 16px" :icon="Refresh" @click="emit('refresh')"/>
      </el-tooltip>
      <div style="display: inline-block;margin-left: 10px" v-if="!!slots.search">
        <el-button type="text" @click="showSearch = false" v-if="showSearch">收起&ensp;<el-icon><ArrowUp/></el-icon></el-button>
        <el-button type="text" @click="showSearch = true" v-if="!showSearch">展开&ensp;<el-icon><ArrowDown/></el-icon></el-button>
      </div>
    </div>
  </div>
  <div class="table">
    <slot name="table"/>
  </div>
  <div class="pagination">
    <slot name="pagination" />
  </div>
</template>

<script setup>
import {defineEmits, onMounted, ref, useSlots, watch, defineProps} from "vue";
import {Refresh} from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['reset', 'search', 'refresh'])
const slots = useSlots()
const showSearch = ref(true)
const showButton = ref(true)
// const tableHeight = ref(0)

onMounted(() => {
  showSearch.value = !!slots.search
  showButton.value = !!slots.button
  // height: calc(100vh - 374px);

  //计算表格高度
  // if (showButton.value) {
  //   tableHeight.value = 'calc(100vh - 320px)'
  //   emit('update:modelValue', tableHeight.value)
  // } else {
  //   tableHeight.value = 'calc(100vh - 270px)'
  //   emit('update:modelValue', tableHeight.value)
  // }
})

// watch(
//     () => showSearch.value,
//     newValue => {
//       if (newValue) {
//         tableHeight.value = 'calc(100vh - 320px)'
//         emit('update:modelValue', tableHeight.value)
//       } else {
//         tableHeight.value = 'calc(100vh - 270px)'
//         emit('update:modelValue', tableHeight.value)
//       }
//     }
// )

</script>

<style scoped lang="less">
.search {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  transition: all 1s;
  .search-item {
    display: flex;
    flex-wrap: wrap;
    :deep(.el-form-item) {
      margin-right: 20px;
      :deep(.el-input__wrapper) {
        width: 200px;
      }
    }
  }
  .search-btn {
    display: flex;
    height: 50px;
    width: 140px;
  }
}
.button {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.table {
  width: 100%;
  //transition: height 1s;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>