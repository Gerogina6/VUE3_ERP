<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">
        <el-image src="https://wallpapercave.com/wp/wp2775554.png" fit="cover" :lazy="true"></el-image>
      </div>
      <el-form ref="formRef" :model="form">
        <el-form-item>
          <el-input class="input" v-model="form.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input class="input" v-model="form.password" placeholder="密码" prefix-icon="Lock" />
        </el-form-item>
        <div class="btns">
          <el-button type="primary" class="btn">登录</el-button>
          <div class="btn reset">重置</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<stript setup lang="ts">
import { ref } from 'vue'
interface Form {
  username: string;
  password: string;
}
const form = ref<Form>({
  username: "",
  password: "",
});
const formRef = ref<FormInstance>()

export default {

}
</stript>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: linear-gradient(to right, #1960ae, #025291);
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 360px;
    height: 450px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 4px 2px;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .el-form {
    width: 90%;
    margin-top: 30px;
    .input {
      height: 40px;
      :deep(.el-input__wrapper) {
        border-radius: 20px;
        border: 1px solid #111;
      }
    }
    .btns {
      display: flex;
      flex-direction: column;
      align-items: center;

      .btn {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        margin-bottom: 20px;
        cursor: pointer;
      }
      .reset {
        text-align: center;
      }
    }
  }
}
</style>