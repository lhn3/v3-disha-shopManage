<template>
  <el-container class="image-manager">
    <el-header class="image-header">
      <el-button type="success" text bg round @click="openDrawer">新增图片分类</el-button>
      <el-button type="warning" text bg round>上传图片</el-button>
    </el-header>
    <el-container class="image-container">
      <el-aside class="image-aside" width="250px">
        <div class="aside-list">
          <SelectItem v-for="item in stateClassify.classify" :key="item.id" :title="item.name"
                      @handelEdit="handelEdit(item)"
                      @handelDelete="handelDelete(item.id)" :active="item.id === stateClassify.selectItemId"
                      @handelTitle="handelTitle(item.id)"/>
        </div>
        <div class="aside-pages">
          <el-pagination
              background
              :current-page="stateClassify.currentPage"
              :page-size="stateClassify.pageSize"
              :total="stateClassify.totalCount"
              layout="prev, next"
              @current-change="val => pageCurrentChangeHandle(val, 'classify')"
          />
        </div>
      </el-aside>
      <el-main class="image-main">
        <div class="main-list">
          <div v-for="item in stateImage.imageList" :key="item.id">{{ item.name }}</div>
        </div>
        <div class="main-pages">
          <el-pagination
              background
              :current-page="stateImage.currentPage"
              :page-size="stateImage.pageSize"
              :total="stateImage.totalCount"
              layout="prev, pager, next"
              @current-change="val => pageCurrentChangeHandle(val, 'image')"
          />
        </div>
      </el-main>
    </el-container>
  </el-container>

  <FormDrawer v-model="drawer" :title="formData.title" :loading="loading" @handleClose="drawerClose" @onSubmit="drawerSubmit">
    <el-form ref="formRef" :model="formData" :rules="formData.rules" label-width="100px">
      <el-form-item prop="name" label="分类名称：">
        <el-input v-model.trim="formData.name" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item prop="order" label="排序：">
        <el-input-number v-model="formData.order" min="0" precision="0"/>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import SelectItem from '@/components/SelectItem.vue'
import {getImageClassify, getImageList, addClassify, updateClassify, delClassify} from '@/request/api/otherModules.js'
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {messageBox} from "@/utils/message.js";
import FormDrawer from "@/components/FormDrawer.vue"

const drawer = ref(false)
const loading = ref(false)
const formRef = ref(null)

//分类数据
const stateClassify = reactive({
  currentPage: 1,
  pageSize: 10,
  selectItemId: null,//被选中的分类id
  classify: [], //分类列表
  totalCount: 0 //分类总数
})
//图片数据
let stateImage = reactive({
  currentPage: 1,
  pageSize: 10,
  imageList: [], //图片列表
  totalCount: 0 //图片总数
})
//新增修改分类数据
let formData = reactive({
  title: '',
  id: null,
  name: '',
  order: 0,
  rules: {
    name: {required: true, message: '请输入分类名称', trigger: 'blur'},
    order: {required: true, message: '请输入排序', trigger: 'blur'}
  }
})

//获取分类
const getClassify = async (first = false) => {
  let res = await getImageClassify({page: stateClassify.currentPage, limit: stateClassify.pageSize})
  if (res.code !== 200) {
    return ElMessage.error(res.msg + '!')
  }
  stateClassify.classify = res.data.list
  stateClassify.totalCount = res.data.totalCount
  //第一次加载需要请求图片和设置id
  if (first) {
    stateClassify.selectItemId = stateClassify.classify[0].id
    getImage(stateClassify.selectItemId)
  }
}

//获取图片列表
const getImage = async (id) => {
  let res = await getImageList({id, page: stateImage.currentPage, limit: stateImage.pageSize})
  if (res.code !== 200) {
    return ElMessage.error(res.msg + '!')
  }
  stateImage.imageList = res.data.list
  stateImage.totalCount = res.data.totalCount
}

//初始化数据
onMounted(() => {
  getClassify(true)
})

//分类被点击
const handelTitle = id => {
  stateClassify.selectItemId = id
  stateImage.currentPage = 1
  getImage(id)
}

// 点击分页
const pageCurrentChangeHandle = (val, type) => {
  if (type == 'classify') {
    stateClassify.currentPage = val
    getClassify()
  } else {
    stateImage.currentPage = val
    getImage(stateClassify.selectItemId)
  }
}

//打开右侧抽屉
const openDrawer = () => {
  formData.order = stateClassify.classify[0].order + 1
  formData.title = '新增分类'
  drawer.value = true
}

//关闭右侧抽屉
const drawerClose = () => {
  formData.title = ''
  formData.id = null
  formData.name = ''
  formData.order = 0
}

//提交侧抽屉
const drawerSubmit = () => {
  formRef.value.validate(async isValid => {
    if (!isValid) return
    loading.value = true
    let res = formData.id
        ? await updateClassify({id: formData.id, name: formData.name, order: formData.order})
        : await addClassify({name: formData.name, order: formData.order})
    if (res.code !== 200) {
      loading.value = false
      return ElMessage({
        message: res.msg + '!',
        type: 'error',
        dangerouslyUseHTMLString: true
      })
    }
    ElMessage.success(formData.id ? '修改成功~' : '新增成功~')
    //清空数据
    drawerClose()
    loading.value = false
    drawer.value = false
    getClassify()
  })
}

//编辑按钮
const handelEdit = item => {
  formData.title = '修改分类'
  formData.id = item.id
  formData.name = item.name
  formData.order = item.order
  drawer.value = true
}

//删除按钮
const handelDelete = id => {
  messageBox('确认删除？').then(async ()=>{
    let res = await delClassify(id)
    if (res.code !== 200) {
      loading.value = false
      return ElMessage({
        message: res.msg + '!',
        type: 'error',
        dangerouslyUseHTMLString: true
      })
    }
    ElMessage.success('删除成功~')
    getClassify()
  })
}
</script>

<style scoped lang="less">
.image-manager {
  height: 100%;
  .image-header {
    height: 70px;
    border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
  }
  .image-container {
    height: calc(100% - 70px);
    .image-aside {
      border-right: 1px solid #eeeeee;
      .aside-list {
        overflow: auto;
        overflow-x: hidden;
        height: calc(100% - 50px);
      }
      .aside-pages {
        height: 50px;
        border-top: 1px solid #eeeeee;
      @apply flex items-center justify-center;
      }
    }
    .image-main {
      padding: 0;
      .main-list {
        overflow: auto;
        overflow-x: hidden;
        height: calc(100% - 50px);
      }
      .main-pages {
        height: 50px;
        border-top: 1px solid #eeeeee;
      @apply flex items-center justify-center;
      }
    }
  }
}
:deep(.el-input-number__decrease), :deep(.el-input-number__increase) {
  top: 2px !important;
  bottom: 2px !important;
}

</style>