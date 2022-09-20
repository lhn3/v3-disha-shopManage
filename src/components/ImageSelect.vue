<template>
  <div class="image imagePlus" style="cursor: pointer" v-if="!props.modelValue"
       @click="chooseImageVisible = true">
    <el-icon>
      <Plus/>
    </el-icon>
    {{ props.modelValue }}
  </div>
  <div class="image imageControl" v-else>
    <el-image :src=props.modelValue fit="cover" style="width: 100%;height: 100%"/>
    <div class="cover">
      <el-icon style="cursor: pointer" @click="imageDialog">
        <ZoomIn/>
      </el-icon>
      <el-icon style="cursor: pointer" @click="chooseImageVisible = true">
        <Refresh/>
      </el-icon>
      <el-icon style="cursor: pointer" @click="imageDelete">
        <Delete/>
      </el-icon>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl"/>
  </el-dialog>

  <!--  选择图片弹窗-->
  <el-dialog width="70vw" custom-class="custom-dialog" v-model="chooseImageVisible" title="图片选择">
    <Image v-if="chooseImageVisible" :is-component="true" @chooseImage="chooseImage"/>
  </el-dialog>
</template>

<script setup>
import {ref, defineProps} from "vue";
import Image from '@/pages/OtherModules/Image/Image.vue'
import {Refresh, Plus, ZoomIn, Delete} from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: String,
  default: ''
})
const emit = defineEmits(['update:modelValue'])
const chooseImageVisible = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//上传的头像查看大图
const imageDialog = () => {
  dialogImageUrl.value = props.modelValue
  dialogVisible.value = true
}

//选择头像
const chooseImage = url => {
  emit('update:modelValue', url)
  chooseImageVisible.value = false
}

//删除头像
const imageDelete = () => {
  emit('update:modelValue', '')
}

</script>

<style scoped lang="less">
.image {
  width: 150px;
  height: 150px;
  border: 1px dashed #c3c4c8;
  border-radius: 6px;
}
.imagePlus {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f5f5;
  font-size: 34px;
  color: #aaaaaa;
  cursor: pointer;
}
.imagePlus:hover {
  background-color: #ececec;
  color: #807f7f;
}
.imageControl {
  position: relative;
  overflow: hidden;
  .cover {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 24px;
    display: none;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
    padding: 0 20px;
  }
}
.imageControl:hover {
  .cover {
    display: flex;
  }
}
</style>