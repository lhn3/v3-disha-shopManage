<template>
  <div class="main-list">
    <el-row :gutter="20">
      <el-col v-for="item in state.imageList" :key="item.id" :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="image-cart">
          <el-image class="image-cart-image" :src="item.url" fit="cover" :preview-src-list="[item.url]"/>
          <div class="image-cart-title">{{ item.name }}</div>
          <div class="image-cart-btns">
            <el-button type="text" class="image-cart-btn1">重命名</el-button>
            <el-button type="text" class="image-cart-btn2">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div class="main-pages">
    <el-pagination
        background
        :current-page="state.currentPage"
        :page-size="state.pageSize"
        :total="state.totalCount"
        layout="prev, pager, next"
        @current-change="pageCurrentChangeHandle"
    />
  </div>
  <!--    图片抽屉-->
  <FormDrawer v-model="drawer" title="图片上传" :loading="loading" @handleClose="drawerClose"
              @onSubmit="drawerSubmit">
  </FormDrawer>
</template>

<script setup>
import FormDrawer from "@/components/FormDrawer.vue"
import {ElMessage} from "element-plus";
import {reactive, ref, defineExpose} from "vue";
import {getImageList} from "@/request/api/otherModules.js";

const drawer = ref(false)
const loading = ref(false)
let state = reactive({
  classifyId: null,
  currentPage: 1,
  pageSize: 10,
  imageList: [], //图片列表
  totalCount: 0 //图片总数
})

//获取图片列表
const getImage = async (id) => {
  let res = await getImageList({id, page: state.currentPage, limit: state.pageSize})
  if (res.code !== 200) {
    return ElMessage.error(res.msg + '!')
  }
  state.imageList = res.data.list
  state.totalCount = res.data.totalCount
  console.log(state.imageList)
}

// 点击分页
const pageCurrentChangeHandle = val => {
  state.currentPage = val
  getImage(state.classifyId)
}

//关闭右侧抽屉
const drawerClose = () => {
}

//提交侧抽屉
const drawerSubmit = () => {
}

defineExpose({
  getImage,
  state,
  drawer
})
</script>

<style scoped lang="less">
.main-list {
  overflow: auto;
  overflow-x: hidden;
  height: calc(100% - 50px);
  .image-cart {
    position: relative;
    margin-bottom: 20px;
    .image-cart-image {
      width: 100%;
      height: 160px;
    }
    .image-cart-title {
      position: absolute;
      top: 130px;
      padding: 0 10px;
      line-height: 30px;
      height: 30px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .image-cart-btns {
      padding: 10px;
      text-align: center;
      .image-cart-btn1 {
        color: #409dfe;
        margin-right: 20px;
      }
      .image-cart-btn2 {
        color: #f46c6c;
        margin-left: 20px;
      }
    }
  }
}
.main-pages {
  height: 50px;
  border-top: 1px solid #eeeeee;
@apply flex items-center justify-center;
}
</style>