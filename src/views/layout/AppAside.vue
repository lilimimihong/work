<script setup lang="ts">
import { isCollapse } from './isCollapse';
</script>
<template>

    <el-aside>
        <!-- 菜单 -->
        <el-menu router unique-opened :collapse="isCollapse">
            <a href="/" class="logo">
                <img src="@/assets/logo.svg" alt="" />
                <h1>TODO LIST</h1>
            </a>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <IEpSetting />
                    </el-icon><span>首页</span>
                </template>

                <el-menu-item index="/menus"><el-icon>
                        <IEpSetting />
                    </el-icon><span>学习</span>
                </el-menu-item>

                <el-menu-item index="/work"><el-icon>
                        <IEpSetting />
                    </el-icon><span>工作</span>
                </el-menu-item>

                <el-menu-item index="/life"><el-icon>
                        <IEpSetting />
                    </el-icon><span>生活</span>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <IEpSetting />
                    </el-icon><span>待办事项</span>
                </template>

                <el-menu-item index="/viewList"><el-icon>
                        <IEpSetting />
                    </el-icon><span>查看</span>
                </el-menu-item>
            </el-sub-menu>
            
        </el-menu>
    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    background-color: aliceblue;
    height: 100vh;
    width: auto;
}

.el-menu {
    background-color: aliceblue;
    border-right: none;
    width: 200px;

    &.el-menu--collapse {
        width: 60px;
    }
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-decoration: none;
    color: black;

    img {
        width: 32px;
        height: 32px;
    }
}
</style>