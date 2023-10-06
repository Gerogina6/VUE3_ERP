<template>
    <div id="overview">
        <div class="userinfo">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <span class="username">xxx</span>
        </div>
        <div class="overview-list">
            <div class="overview-item">
                <div class="title">666</div>
                <div class="number">6666666</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
#overview {
    .userinfo {
        display: flex;
        align-items: center;
    }
    .username {
        margin-left: 10px;
    }
}
</style>