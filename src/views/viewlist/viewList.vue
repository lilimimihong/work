<script setup lang="ts">
import { useRouter } from "vue-router"
import { useMenus } from "@/composables/useMenus"; 

const router = useRouter()
const { allMenus, getAllMenus, handleDelete, toggleStatus } = useMenus();

const getCategoryTag = (category: string) => {
    switch (category) {
        case '工作': return ''; 
        case '生活': return 'success'; 
        case '学习': return 'warning'; 
        default: return 'info'; 
    }
}


getAllMenus()
</script>

<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-weight: bold; font-size: 16px;">所有待办事项总览</span>
            <el-button style="float: right;" type="primary" @click="router.push('/menus/create')">
                新增事项
            </el-button>
        </div>

        <el-table :data="allMenus" border style="width: 100%; margin-top: 20px;">
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            
            <el-table-column prop="name" label="事项名称" align="center" ></el-table-column>

            <el-table-column prop="category" label="所属分类" align="center" width="100">
                <template #default="scope">
                    <el-tag :type="getCategoryTag(scope.row.category)" effect="light">
                        {{ scope.row.category || '未分类' }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="status" label="当前状态" align="center" width="100">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'completed' ? 'success' : 'danger'">
                        {{ scope.row.status === 'completed' ? '已完成' : '进行中' }}
                    </el-tag>
                </template>
            </el-table-column>
            
            <el-table-column prop="orderNum" label="排序" align="center" width="80"></el-table-column>
            
            <el-table-column label="操作" align="center" width="180">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="router.push({name:'menu-edit', params:{id: scope.row.id}})">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>

            <el-table-column label="状态变更" align="center" width="180">
                <template #default="scope">
                    <el-button size="small" type="success" 
                        :disabled="scope.row.status === 'completed'"
                        @click="toggleStatus(scope.row, 'completed')">
                        完成
                    </el-button>
                    <el-button size="small" type="warning" 
                        :disabled="scope.row.status !== 'completed'"
                        @click="toggleStatus(scope.row, 'uncompleted')">
                        未完成
                    </el-button>
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