<script setup lang="ts">
import {  RouterView } from 'vue-router'
import request from "./utils/Request"
request({
  method: 'get',
  //完整请求地址:http://localhost:5173/api/user
  url: '/api/user'//请求地址 "/front/ad/getAdList" 
  }).then((res) => {
    console.log(res)
  })
// // import {  User as IconUser, Setting } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'

</script>

<template>
  
  <RouterView />
</template>

<style scoped></style>
