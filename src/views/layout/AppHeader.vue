<script setup lang="ts">

import { ref } from 'vue'; 
import { isCollapse } from './isCollapse';
import {getInfo,logout} from "@/api/users";
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTokenStore } from '@/stores/token';
import { useRouter } from 'vue-router';

const userInfo = ref({portrait:"",userName:""})
getInfo().then((res) =>{
    userInfo.value = res.data.content
})

// 退出登录事件处理
const handleLogout = async() => {
    //询问确认退出
    await ElMessageBox.confirm('确认退出?',"退出询问",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).catch(()=>{
        ElMessage.info('取消退出操作')
        return new Promise(()=>{})
    })
    //执行退出
    await logout().catch(()=>{})
    ElMessage.success('退出成功')
    //清空token信息,跳转登录页面
    const store= useTokenStore()
    store.saveToken("")
    //还可以写为     useTokenStore().saveToken("")
    const router = useRouter()
    router.push({ name: 'login' })
    
}
</script>
<template>
    <el-header>
        <!-- 图标 -->
        <el-icon @click="isCollapse =!isCollapse">
            <IEpExpand v-show="isCollapse" />
            <IEpFold v-show="!isCollapse" />
        </el-icon>

        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">promotion management</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="32" :src="userInfo.portrait" />
                <el-icon class="el-icon--right">
                    <i-ep-arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>

                    <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout"> 退出</el-dropdown-item>

                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>
<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    background-color: rgb(211, 233, 253);

    .el-icon {
        margin-right: 17px;
    }
}

.el-dropdown {
    margin-left: auto;

    .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>