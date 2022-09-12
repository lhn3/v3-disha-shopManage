<template>
  <div class="notice">
    <div class="button">
      <el-button type="primary" @click="openDrawer">新增</el-button>
      <el-tooltip
          effect="dark"
          content="刷新"
          placement="top-start"
      >
        <el-button type="text" style="font-size: 16px" :icon="Refresh" @click="getNotice"/>
      </el-tooltip>
    </div>
    <el-table height="calc(100vh - 270px)" stripe :data="state.noticeList" border style="width: 100%"
              @cell-dblclick="editNotice">
      <el-table-column prop="title" label="公告标题" header-align="center" align="center"/>
      <el-table-column prop="content" label="公告内容" header-align="center" align="center"/>
      <el-table-column prop="update_time" label="发布时间" header-align="center" align="center"/>
      <el-table-column label="操作" fixed="right" width="150px" header-align="center" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="editNotice(row)">修改</el-button>
          <el-button type="text" style="color: #f46c6c" @click="deleteNotice(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination"
                   background
                   :current-page="state.currentPage"
                   :page-size="state.pageSize"
                   :total="state.totalCount"
                   layout="prev, pager, next"
                   @current-change="pageCurrentChangeHandle"/>
  </div>
  <!--  分类抽屉-->
  <FormDrawer v-model="drawer" :title="formData.title" :loading="loading" @handleClose="drawerClose"
              @onSubmit="drawerSubmit">
    <el-form ref="formRef" :model="formData" :rules="formData.rules" label-width="100px">
      <el-form-item prop="noticeTitle" label="公告标题：">
        <el-input v-model.trim="formData.noticeTitle" placeholder="请输入公告标题" clearable/>
      </el-form-item>
      <el-form-item prop="noticeContent" label="公告内容：">
        <el-input type="textarea" placeholder="请输入公告内容" v-model="formData.noticeContent"
                  maxlength="200" show-word-limit :rows="5" clearable/>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import {Refresh} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {getNoticeList, updateNotice, delNotice, addNotice} from "@/request/api/otherModules.js";
import {ElMessage} from "element-plus";
import {messageBox} from "@/utils/message.js";

const drawer = ref(false)
const loading = ref(false)
const formRef = ref()
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  noticeList: []
})
//新增修改分类数据
let formData = reactive({
  title: '',
  id: null,
  noticeTitle: '',
  noticeContent: '',
  rules: {
    noticeTitle: {required: true, message: '请输入必填项', trigger: 'blur'},
    noticeContent: {required: true, message: '请输入必填项', trigger: 'blur'}
  }
})

//获取公告列表
const getNotice = async () => {
  let res = await getNoticeList({page: state.currentPage, limit: state.pageSize})
  if (res.code !== 200) {
    return ElMessage.error(res.msg + '!')
  }
  state.noticeList = res.data.list
  state.totalCount = res.data.totalCount
}

onMounted(() => {
  getNotice()
})

// 点击分页
const pageCurrentChangeHandle = val => {
  state.currentPage = val
  getNotice()
}

//新增
const openDrawer = () => {
  formData.title = '新增公告'
  drawer.value = true
}

//修改
const editNotice = (row) => {
  formData.title = '修改公告'
  formData.id = row.id
  formData.noticeTitle = row.title
  formData.noticeContent = row.content
  drawer.value = true
}

// 删除
const deleteNotice = (row) => {
  messageBox('确认删除？').then(async r => {
    if (!r) return
    let res = await delNotice(row.id)
    if (res.code !== 200) {
      loading.value = false
      return ElMessage({
        message: res.msg + '!',
        type: 'error',
        dangerouslyUseHTMLString: true
      })
    }
    ElMessage.success('删除成功~')
    getNotice()
  })
}

//关闭右侧抽屉
const drawerClose = () => {
  formRef.value.resetFields()
  formData.title = ''
  formData.id = null
  formData.noticeTitle = ''
  formData.noticeContent = ''
}

//提交侧抽屉
const drawerSubmit = () => {
  formRef.value.validate(async isValid => {
    if (!isValid) return
    loading.value = true
    let res = formData.id
        ? await updateNotice({id: formData.id, title: formData.noticeTitle, content: formData.noticeContent})
        : await addNotice({title: formData.noticeTitle, content: formData.noticeContent})
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
    getNotice()
  })
}
</script>

<style scoped lang="less">
.notice {
  padding: 0 20px;
  .button {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
  .pagination {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>