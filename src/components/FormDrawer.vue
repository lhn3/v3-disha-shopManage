<template>
  <el-drawer ref="drawerRef" v-model="moduleValue" :title="title" direction="rtl" :close-on-click-modal="false" :before-close="cancel">
    <slot />
    <div>
      <el-button class="w-[50px]" type="default" @click="cancel">取消</el-button>
      <el-button class="w-[50px]" color="#6366f1" type="primary" @click="confirm">确定</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";
const props =defineProps({
  moduleValue:{
    type:Boolean,
    default:false
  },
  title:{
    type:String,
    default:'默认标题'
  }
})
const emit = defineEmits(['handleClose','onSubmit'])
const drawerRef = ref()

const cancel = () => {
  emit('handleClose')
  drawerRef.value.close()
}
const confirm = () => {
  emit('onSubmit')
}
</script>

<style scoped>

</style>