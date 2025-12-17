<script setup lang="ts">
import { useRouter } from "vue-router"
import { useMenus } from "@/composables/useMenus";
import { computed } from "vue"; 

const router = useRouter()
const { allMenus, getAllMenus, handleDelete, toggleStatus } = useMenus();

getAllMenus()

// 过滤出 category 为 '工作' 的项
const workList = computed(() => {
    return allMenus.value.filter(item => item.category === '工作')
})
</script>

<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-button type="primary" @click="router.push('/menus/create')">添加工作事项</el-button>
        </div>
        <el-table :data="workList" border style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="name" label="工作内容" align="center"></el-table-column>
            
            <el-table-column prop="status" label="当前状态" align="center">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'completed' ? 'success' : 'warning'">
                        {{ scope.row.status === 'completed' ? '已完成' : '进行中' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="排序" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="router.push({name:'menu-edit', params:{id: scope.row.id}})">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column label="状态变更" align="center" width="200">
                <template #default="scope">
                    <el-button size="small" type="success" :disabled="scope.row.status === 'completed'" @click="toggleStatus(scope.row, 'completed')">完成</el-button>
                    <el-button size="small" type="warning" :disabled="scope.row.status !== 'completed'" @click="toggleStatus(scope.row, 'uncompleted')">未完成</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card {
    width: auto;
}
</style>