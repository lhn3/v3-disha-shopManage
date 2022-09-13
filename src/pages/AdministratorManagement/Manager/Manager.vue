<template>
  <div class="manager">
    <div class="search">
      <el-form-item label="管理员昵称：">
        <el-input placeholder="请输入" v-model="state.dataForm.keyword" clearable/>
      </el-form-item>
      <div>
        <el-button type="primary" @click="getInfo">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="button">
      <el-button type="primary" @click="openDrawer">新增</el-button>
      <el-tooltip effect="dark" content="刷新" placement="top-start">
        <el-button type="text" style="font-size: 16px" :icon="Refresh" @click="getInfo"/>
      </el-tooltip>
    </div>
    <el-table height="calc(100vh - 320px)" :data="state.managerList" style="width: 100%">
      <el-table-column prop="title" label="管理员" header-align="center">
        <template #default="{ row }">
          <div style="display: flex;padding: 5px">
            <el-image :src="row.avatar" fit="cover" style="width: 50px;height: 50px;border-radius: 25px"/>
            <div style="padding-left: 20px">
              <div style="line-height: 25px">{{ row.username }}</div>
              <div style="line-height: 25px">ID：{{ row.id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="所属管理员" header-align="center" align="center">
        <template #default="{ row }">
          {{ row.role.name }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" header-align="center" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
                     @change="(value) => changeStatus(value, row.id)" :disabled="row.super === 1"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px" header-align="center" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="editManager(row)" :disabled="row.super === 1">修改</el-button>
          <el-button type="text" style="color: #f46c6c" @click="deleteManager(row)" :disabled="row.super === 1">删除
          </el-button>
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

  <!--  抽屉-->
  <FormDrawer v-model="drawer" :title="formData.title" :loading="loading" @handleClose="drawerClose"
              @onSubmit="drawerSubmit">
    <el-form ref="formRef" :model="formData" :rules="formData.rules" label-width="120px">
      <el-form-item prop="username" label="用户名：">
        <el-input v-model.trim="formData.username" placeholder="请输入用户名" clearable/>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input type="password" placeholder="请输入密码" v-model="formData.password"
                  maxlength="200" show-word-limit :rows="5" clearable/>
      </el-form-item>
      <el-form-item prop="avatar" label="头像：">
        <div class="avatar avatarPlus" style="cursor: pointer" v-if="!formData.avatar" @click="chooseImageVisible = true">
          <el-icon><Plus/></el-icon>
          {{ formData.avatar }}
        </div>
        <div class="avatar avatarControl" v-else>
          <el-image :src=formData.avatar fit="cover" style="width: 100%;height: 100%" />
          <div class="cover">
            <el-icon style="cursor: pointer" @click="avatarDialog" ><ZoomIn/></el-icon>
            <el-icon style="cursor: pointer" @click="chooseImageVisible = true" ><Refresh /></el-icon>
            <el-icon style="cursor: pointer" @click="avatarDelete"><Delete/></el-icon>
          </div>
        </div>
        <el-dialog v-model="formData.dialogVisible">
          <img w-full :src="formData.dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item prop="role_id" label="所属管理员：">
        <el-select v-model="formData.role_id" placeholder="请选择" clearable>
          <el-option
              v-for="item in state.roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态：">
        <el-switch v-model="formData.status" :active-value="1" :inactive-value="0"/>
      </el-form-item>
    </el-form>
  </FormDrawer>

<!--  选择图片弹窗-->
  <el-dialog width="70vw" custom-class="custom-dialog" v-model="chooseImageVisible" title="图片选择">
    <Image v-if="chooseImageVisible" :is-component="true" @chooseImage="chooseImage" />
  </el-dialog>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import {Refresh, Plus, ZoomIn, Delete} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {messageBox} from "@/utils/message.js";
import {
  getManagerList,
  updateManagerStatus,
  addManager,
  updateManager,
  delManager
} from "@/request/api/AdministratorManagement.js";
import Image from '@/pages/OtherModules/Image/Image.vue'

const drawer = ref(false)
const loading = ref(false)
const formRef = ref()
const chooseImageVisible = ref(false)
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  managerList: [],
  dataForm: {
    keyword: ''
  }
})
//新增修改分类数据
let formData = reactive({
  title: '',
  id: null,
  username: '',
  password: '',
  avatar: '',
  role_id: '',
  status: '',
  dialogImageUrl: '',
  dialogVisible: false,
  rules: {
    username: {required: true, message: '请输入必填项', trigger: 'blur'},
    password: {required: true, message: '请输入必填项', trigger: 'blur'},
    role_id: {required: true, message: '请选择必填项', trigger: 'blur'}
  }
})

//获取公告列表
const getInfo = async () => {
  let res = await getManagerList({page: state.currentPage, limit: state.pageSize, ...state.dataForm})
  if (res.code !== 200) {
    return ElMessage.error(res.msg + '!')
  }
  state.managerList = res.data.list
  state.totalCount = res.data.totalCount
  state.roles = res.data.roles
}

onMounted(() => {
  getInfo()
})

//重置
const reset = () => {
  state.dataForm.keyword = ''
  getInfo()
}

// 点击分页
const pageCurrentChangeHandle = val => {
  state.currentPage = val
  getInfo()
}

//修改管理员状态
const changeStatus = async (value, id) => {
  let res = await updateManagerStatus({id, status: value})
  if (res.code !== 200) {
    getInfo()
    return ElMessage({
      message: res.msg + '!',
      type: 'error',
      dangerouslyUseHTMLString: true
    })
  }
  ElMessage.success('状态更新成功~')
}

//新增
const openDrawer = () => {
  formData.title = '新增公告'
  formData.status = 1
  drawer.value = true
}

//修改
const editManager = (row) => {
  formData.title = '修改公告'
  formData.id = row.id
  formData.username = row.username
  formData.password = row.password
  formData.avatar = row.avatar
  formData.role_id = row.role.id
  formData.status = row.status
  drawer.value = true
}

// 删除
const deleteManager = (row) => {
  messageBox('确认删除？').then(async r => {
    if (!r) return
    let res = await delManager(row.id)
    if (res.code !== 200) {
      loading.value = false
      return ElMessage({
        message: res.msg + '!',
        type: 'error',
        dangerouslyUseHTMLString: true
      })
    }
    ElMessage.success('删除成功~')
    getInfo()
  })
}

//关闭右侧抽屉
const drawerClose = () => {
  formRef.value.resetFields()
  formData.title = ''
  formData.id = null
  formData.username = ''
  formData.password = ''
  formData.avatar = ''
  formData.role_id = ''
  formData.status = ''
}

//选择头像
const chooseImage = url => {
  formData.avatar = url
  chooseImageVisible.value = false
}

//上传的头像查看大图
const avatarDialog = () => {
  formData.dialogImageUrl = formData.avatar
  formData.dialogVisible = true
}

//删除头像
const avatarDelete = () => {
  formData.avatar = ''
}

//提交侧抽屉
const drawerSubmit = () => {
  formRef.value.validate(async isValid => {
    if (!isValid) return
    let form = {
      username: formData.username,
      password: formData.password,
      avatar: formData.avatar,
      role_id: formData.role_id,
      status: formData.status
    }
    loading.value = true
    let res = formData.id
        ? await updateManager({id: formData.id, ...form})
        : await addManager(form)
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
    getInfo()
  })
}
</script>

<style scoped lang="less">
.manager {
  padding: 20px;
  .search {
    display: flex;
    justify-content: space-between;
  }
  .button {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
.avatar{
  width: 150px;
  height: 150px;
  border: 1px dashed #c3c4c8;
  border-radius: 6px;
}
.avatarPlus {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f5f5;
  font-size: 34px;
  color: #aaaaaa;
  cursor: pointer;
}
.avatarPlus:hover {
  background-color: #ececec;
  color: #807f7f;
}
.avatarControl{
  position: relative;
  overflow: hidden;
  .cover {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    font-size: 24px;
    display: none;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
    padding: 0 20px;
  }
}
.avatarControl:hover {
  .cover {
    display: flex;
  }
}
</style>