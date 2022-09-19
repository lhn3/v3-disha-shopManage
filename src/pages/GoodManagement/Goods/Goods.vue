<template>
  <div class="goods">
    <el-tabs v-model="state.dataForm.tab" @tab-change="_table.getDataList">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.name"/>
    </el-tabs>
    <div class="search">
      <div class="search-item">
        <el-form-item label="商品名称：">
          <el-input placeholder="请输入" v-model="state.dataForm.title" clearable/>
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select v-model="state.dataForm.category_id" placeholder="请选择" filterable clearable>
            <el-option v-for="item in state.cates" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-button type="primary" @click="_table.search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="button">
      <div>
        <el-button type="primary" @click="openDrawer">新增</el-button>
        <el-button type="danger" @click="_table.deleteHandle" v-if="state.dataForm.tab !== 'delete'">批量删除</el-button>
        <el-button type="success" @click="_table.changeStatus(1)" plain v-if="state.dataForm.tab !== 'delete'">上架</el-button>
        <el-button type="warning" @click="_table.changeStatus(0)" plain v-if="state.dataForm.tab !== 'delete'">下架</el-button>
      </div>
      <el-tooltip effect="dark" content="刷新" placement="top-start">
        <el-button type="text" style="font-size: 16px" :icon="Refresh" @click="_table.getDataList"/>
      </el-tooltip>
    </div>
    <el-table height="calc(100vh - 374px)" border :data="_table.tableInfo.dataList" style="width: 100%"
              @selection-change="_table.selectHandel" @cell-dblclick="editDrawer">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column prop="title" label="商品" header-align="center" width="320px">
        <template #default="{ row }">
          <div style="display: flex;padding: 5px;width: 300px">
            <el-image :src="row.cover" fit="cover" style="width: 80px;height: 80px;border-radius: 10px"/>
            <div style="padding-left: 10px;line-height: 20px;color: #929292;font-size: 12px">
              <div class="text-ellipsis" style="color: #000000;font-size: 16px;font-weight: bold;width: 200px">
                {{ row.title }}
              </div>
              <div style="font-size: 14px"><span style="color: #f84141">￥{{ row.min_price }}</span> |
                <span>￥{{ row.min_oprice }}</span></div>
              <div>分类：{{ row.category.name }}</div>
              <div>创建时间：{{ row.create_time }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sale_count" label="实际销售量" header-align="center" align="center"/>
      <el-table-column prop="status" label="商品状态" header-align="center" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" effect="plain" round>已上架</el-tag>
          <el-tag v-else type="warning" effect="plain" round>已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态" header-align="center" align="center" v-if="state.dataForm.tab !== 'delete'">
        <template #default="{ row }">
          <div v-if="row.ischeck === 0">
            <el-button type="primary" plain>审核通过</el-button>
            <el-button style="margin: 10px 0 0 0" plain type="danger">审核拒绝</el-button>
          </div>
          <el-tag v-if="row.ischeck === 1" effect="plain" round>通过</el-tag>
          <el-tag v-if="row.ischeck === 2" type="danger" effect="plain" round>未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="总库存" header-align="center" align="center"/>
      <el-table-column label="操作" fixed="right" width="150px" header-align="center" align="center" v-if="state.dataForm.tab !== 'delete'">
        <template #default="{ row }">
          <el-button type="text" @click="editDrawer(row)">修改</el-button>
          <el-button type="text">商品规格</el-button>
          <el-button type="text">商品轮播图</el-button>
          <el-button type="text">商品详情</el-button>
          <el-button type="text" style="color: #f46c6c" @click="_table.deleteHandle([row.id])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination"
                   background
                   :current-page="_table.tableInfo.page"
                   :page-size="_table.tableInfo.limit"
                   :total="_table.tableInfo.total"
                   layout="prev, pager, next"
                   @current-change="_table.pageCurrentChangeHandle"/>
  </div>

  <!--  抽屉-->
  <FormDrawer v-model="state.drawer" :title="state.title" :loading="_table.tableInfo.loading"
              @handleClose="drawerClose" @onSubmit="drawerSubmit">
    <el-form ref="formRef" :model="state.formData" :rules="state.rules" label-width="120px">
      <el-form-item prop="username" label="用户名：">
        <el-input v-model.trim="state.formData.username" placeholder="请输入用户名" clearable/>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input type="password" placeholder="请输入密码" v-model="state.formData.password"
                  maxlength="200" show-word-limit :rows="5" clearable/>
      </el-form-item>
      <el-form-item prop="avatar" label="头像：">
        <div class="avatar avatarPlus" style="cursor: pointer" v-if="!state.formData.avatar"
             @click="chooseImageVisible = true">
          <el-icon>
            <Plus/>
          </el-icon>
          {{ state.formData.avatar }}
        </div>
        <div class="avatar avatarControl" v-else>
          <el-image :src=state.formData.avatar fit="cover" style="width: 100%;height: 100%"/>
          <div class="cover">
            <el-icon style="cursor: pointer" @click="avatarDialog">
              <ZoomIn/>
            </el-icon>
            <el-icon style="cursor: pointer" @click="chooseImageVisible = true">
              <Refresh/>
            </el-icon>
            <el-icon style="cursor: pointer" @click="avatarDelete">
              <Delete/>
            </el-icon>
          </div>
        </div>
        <el-dialog v-model="state.formData.dialogVisible">
          <img w-full :src="state.formData.dialogImageUrl" alt="Preview Image"/>
        </el-dialog>
      </el-form-item>
      <el-form-item prop="role_id" label="所属管理员：">
        <el-select v-model="state.formData.role_id" placeholder="请选择" clearable>
          <el-option
              v-for="item in state.roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态：">
        <el-switch v-model="state.formData.status" :active-value="1" :inactive-value="0"/>
      </el-form-item>
    </el-form>
  </FormDrawer>

  <!--  选择图片弹窗-->
  <el-dialog width="70vw" custom-class="custom-dialog" v-model="chooseImageVisible" title="图片选择">
    <Image v-if="chooseImageVisible" :is-component="true" @chooseImage="chooseImage"/>
  </el-dialog>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import {Refresh, Plus, ZoomIn, Delete} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import Image from '@/pages/OtherModules/Image/Image.vue'
import TableView from "@/utils/useView.js";

const tabs = ref([
  {label: '全部', name: 'all'},
  {label: '审核中', name: 'checking'},
  {label: '出售中', name: 'saling'},
  {label: '已下架', name: 'off'},
  {label: '库存预警', name: 'min_stock'},
  {label: '回收站', name: 'delete'},
])
const formRef = ref()
const chooseImageVisible = ref(false)
const state = reactive({
  url: '/admin/goods',
  deleteUrl: '/admin/goods',
  addUrl: '/admin/goods',
  updateUrl: '/admin/goods',
  cates: [],
  title: '', //抽屉标题
  id: null, //修改的数据id
  drawer: false,  //抽屉显示隐藏
  dataForm: { //搜索数据
    title: '',
    tab: 'all',
    category_id: null
  },
  formData: { //新增修改数据
    username: '',
    password: '',
    avatar: '',
    role_id: '',
    status: '',
    dialogImageUrl: '',
    dialogVisible: false,
  },
  rules: {
    username: {required: true, message: '请输入必填项', trigger: 'blur'},
    password: {required: true, message: '请输入必填项', trigger: 'blur'},
    role_id: {required: true, message: '请选择必填项', trigger: 'blur'}
  }
})

let _table = new TableView(state)

onMounted(() => {
  _table.getDataList().then(res => {
    state.cates = res.data.cates
    console.log(res)
  })
})

//重置
const reset = () => {
  state.dataForm.title = ''
  state.dataForm.category_id = null
  _table.search()
}

//新增
const openDrawer = () => {
  state.title = '新增公告'
  state.formData.status = 1
  state.drawer = true
}

//修改
const editDrawer = (row) => {
  state.title = '修改公告'
  state.id = row.id
  state.formData.username = row.username
  state.formData.password = row.password
  state.formData.avatar = row.avatar
  state.formData.role_id = row.role.id
  state.formData.status = row.status
  state.drawer = true
}

//关闭右侧抽屉
const drawerClose = () => {
  formRef.value.resetFields()
  state.title = ''
  state.id = null
  state.formData.username = ''
  state.formData.password = ''
  state.formData.avatar = ''
  state.formData.role_id = ''
  state.formData.status = ''
  state.drawer = false
}

//提交
const drawerSubmit = () => {
  _table.addOrUpdate(formRef.value, state.formData, state.id).then(res => {
    if (res) drawerClose()
  })
}

//选择头像
const chooseImage = url => {
  state.formData.avatar = url
  chooseImageVisible.value = false
}

//上传的头像查看大图
const avatarDialog = () => {
  state.formData.dialogImageUrl = state.formData.avatar
  state.formData.dialogVisible = true
}

//删除头像
const avatarDelete = () => {
  state.formData.avatar = ''
}
</script>

<style scoped lang="less">
.goods {
  padding: 20px;
  .search {
    display: flex;
    justify-content: space-between;
    .search-item{
      display: flex;
      .el-form-item {
        margin-right: 20px;
        :deep(.el-input__wrapper) {
          width: 200px;
        }
      }
    }
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
.avatar {
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
.avatarControl {
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
.avatarControl:hover {
  .cover {
    display: flex;
  }
}
</style>