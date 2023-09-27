<template>
  <div id="home">
    <el-container>
      <el-container>
        <el-affix :offset="120">
          <el-aside width="200px">Aside</el-aside>
        </el-affix>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
  .el-header {
    background-color: #000;
    padding: 0;
  }
  .el-aside {
    background-color: #fff;
    min-height: calc(100vh - 60px);
  }
}
</style>