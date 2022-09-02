<template>
  <el-drawer
      ref="drawerRef"
      v-model="moduleValue"
      :title="title"
      direction="rtl"
      :close-on-click-modal="false"
      :before-close="cancel"
      :width="width"
      :destroy-on-close="destroyOnClose"
      :close-on-press-escape="closeOnPressEscape"
  >
    <div class="main">
      <div class="body">
        <slot />
      </div>
      <div class="btn">
        <el-button class="w-[60px]" type="default" @click="cancel">取消</el-button>
        <el-button :loading="loading" class="w-[60px]" color="#6366f1" type="primary" @click="confirm">确定</el-button>
      </div>
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
  },
  width:{
    type:String,
    default: '30%'
  },
  destroyOnClose:{
    type:Boolean,
    default: false
  },
  closeOnPressEscape:{
    type:Boolean,
    default:true
  },
  loading:{
    type:Boolean,
    default:false
  }
})
const emit = defineEmits(['handleClose','onSubmit'])
const drawerRef = ref()

//取消
const cancel = () => {
  emit('handleClose')
  drawerRef.value.close()
}
//提交
const confirm = () => {
  emit('onSubmit')
}
</script>

<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .body{
    flex: 1;
    overflow-y: auto;
  }
  .btn{
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>