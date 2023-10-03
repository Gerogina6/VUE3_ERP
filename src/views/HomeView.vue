<template>
  <div id="home">
    <el-container>
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>
      <el-container>
        <el-affix>
          <el-aside width="200px">
            <AdminMenu></AdminMenu>
          </el-aside>
        </el-affix>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AdminHeader from '../componests/layout/AdminHeader.vue'
import AdminMenu from '../componests/layout/AdminMenu.vue'
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
  .el-header {
    background-color: #004272;
    padding: 0;
  }
  .el-aside {
    background-color: #004272;
    min-height: calc(100vh - 60px);
  }
}
</style>