<template>


</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import ImageSelect from '@/components/ImageSelect.vue'
import {ref} from "vue";

const drawer = ref(false)
const bannerList = ref([])

//关闭右侧抽屉
const drawerClose = () => {
  state.drawer = false
}

//提交
const drawerSubmit = () => {
}

</script>

<style scoped>

</style>