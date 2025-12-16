<script setup lang="ts">
import AppAside from './AppAside.vue';
import AppHeader from './AppHeader.vue';

</script>
<template>
    <div class="common-layout">
        <el-container>
            <AppAside />

            <el-container class="header-and-main">
                <AppHeader />
                <el-main>
                    <!-- 滚动条 -->
                     <el-scrollbar><Router-view /></el-scrollbar>
                        
                    
                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="scss" scoped>
.header-and-main {
    height: 100vh;
    flex-direction: column;
}
.el-main {
    background-color: azure;
    // padding-right: 0;
}
</style>