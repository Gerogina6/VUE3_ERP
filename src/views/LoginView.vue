<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">
        <el-image src="https://wallpapercave.com/wp/wp2775554.png" fit="fill" :lazy="true"></el-image>
      </div>
    </div>
  </div>
</template>

<stript setup lang="ts">

</stript>

<style lang="scss" scope>
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
}
</style>