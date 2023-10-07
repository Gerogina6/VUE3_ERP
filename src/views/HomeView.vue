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
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AdminHeader from '@/components/layout/AdminHeader.vue'
import AdminMenu from '@/components/layout/AdminMenu.vue'
import { useUserInfoStore } from '@/stores/userinfo.store';
import { getUserinfoApi } from '@/apis/userinfo'
const userInfoStore = useUserInfoStore();

const getUserInfo = async() => {
  const res = await getUserinfoApi()
  userInfoStore.userinfo = res.data
}
getUserInfo()
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