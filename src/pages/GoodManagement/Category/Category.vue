<template>
  <div class="category">
    <Search @refresh="_table.getDataList">
      <template #button>
        <el-button type="primary" @click="openDialog">新增</el-button>
      </template>
    </Search>

    <el-tree
        style="height: calc(100vh - 240px);overflow: scroll;overflow-x: hidden"
        :data="_table.tableInfo.dataList"
        node-key="id"
        expand-on-click-node
        :props="{label: 'name', children: 'child'}"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div>
            <span style="margin-left: 10px">{{ data.name }}</span>
          </div>
          <span @click.stop="() => {}">
            <el-button type="text" @click="openDrawer(data)">推荐商品</el-button>
            <el-switch v-model="data.status" style="margin: 0 10px" :active-value="1" :inactive-value="0"
                       @change="(value) => _table.changeStatus(value,data.id)"/>
            <el-button type="text" @click="openDialog(data)">修改</el-button>
            <el-button type="text" style="color: #f46c6c" @click="_table.deleteHandle(data.id)">删除</el-button>
          </span>
        </span>
      </template>
    </el-tree>

    <!--新增修改-->
    <el-dialog v-model="state.dialogVisible" :title="state.title" width="30%" draggable>
      <el-form v-if="state.dialogVisible" ref="formRef" :model="state.formData" :rules="state.rules">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="state.formData.name" maxlength="15" placeholder="请输入" clearable/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="state.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>

    <!--    推荐商品-->
    <FormDrawer width="40%" v-model="state.drawer" :title="state.title" @handleClose="drawerClose"
                @onSubmit="drawerSubmit" :loading="_table.tableInfo.loading" close-on-click-modal>
      123
    </FormDrawer>
  </div>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import Search from '@/components/Search.vue'
import {onMounted, reactive, ref} from "vue";
import TableView from "@/utils/useView.js";

const formRef = ref()
const state = reactive({
  url: '/admin/category',
  deleteUrl: '/admin/category',
  addUrl: '/admin/category',
  updateUrl: '/admin/category',
  isPage: false,
  title: '', //标题
  id: null, //修改的数据id
  dialogVisible: false,
  drawer: false,
  formData: { //新增修改数据
    name: ''
  },
  rules: {
    name: {required: true, message: '请选择必填项', trigger: 'blur'}
  }
})

let _table = new TableView(state)

onMounted(() => {
  _table.getDataList()
})

//新增或修改
const openDialog = row => {
  if (row) {
    state.title = '修改分类'
    state.formData.name = row.name
    state.id = row.id
  } else {
    state.title = '新增分类'
    state.formData.name = ''
  }
  state.dialogVisible = true
}

//新增修改提交
const submit = () => {
  _table.addOrUpdate(formRef.value, state.formData, state.id).then(res => {
    if (res) state.dialogVisible = false
  })
}


//打开推荐商品的抽屉
const openDrawer = row => {
  state.title = '推荐商品'
  state.id = row.id
  state.drawer = true
}

const drawerClose = () => {

}
const drawerSubmit = () => {

}
</script>

<style scoped lang="less">
.category {
  padding: 20px;
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
:deep(.el-tree-node__content) {
  height: 46px;
  border-bottom: 1px solid #eeeeee;
}
:deep(.el-dialog) {
  border-radius: 10px;
}
</style>