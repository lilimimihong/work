<script setup lang="ts">
import { useRouter } from "vue-router"
import {useMenus} from "@/composables/useMenus";
const router = useRouter()
const { allMenus, getAllMenus ,handleDelete} = useMenus();
//存储返回的数据
// const allMenus = ref<MenuItem[]>()
// //获取数据的完整逻辑
// const getAllMenus = async () => {
//     const { data } = await getAll()
//     if (data.code === "000000") {
//         allMenus.value = data.data
//     } else {
//         ElMessage.error('获取菜单列表失败')
//         throw new Error('获取所有菜单失败')
//     }

// }
getAllMenus()


</script>

<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            
            <el-button type="primary" @click="router.push('/menus/create')">添加菜单</el-button>
        </div>
        <el-table :data="allMenus" border style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="180"></el-table-column>
            <el-table-column prop="name" label="菜单名称"  align="center"></el-table-column>
            <el-table-column prop="level" label="菜单层级"  align="center"></el-table-column>
            <el-table-column prop="icon" label="菜单图标" align="center"></el-table-column>
            <el-table-column prop="orderNum" label="排序"  align="center" ></el-table-column>
            <el-table-column label="操作" v-slot="scope">
                <el-button type="primary" @click="router.push({name:'menu-edit',params:{id:scope.row.id
                }})">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </el-table-column>
        </el-table>
    </el-card>
</template>


<style lang="scss" scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

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