<template>
    <div id="users">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <div class="header">
                <el-input v-model="keyword" placeholder="请输入" class="input">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </div>

            <el-table :data="tableData">
                <el-table-column prop="id" label="id" width="55px"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="gender" label="性别" width="55px">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.gender === 0 ? '女' : '男' }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="头像">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-avatar :src="scope.row.avater"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phoneNumber" label="电话"></el-table-column>
                <el-table-column label="禁用状态">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-switch v-model="scope.row.status" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="query.requestPage"
                v-model:page-size="query.pageSize"
                :page-sizes="[5,10,20]"
                layout="sizes, prev, pager, next"
                :total="total"
                @size-change="getUserlist"
                @current-change="getUserlist"
            />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Search } from '@element-plus/icons-vue'
import { getUserlistApi } from '@/apis/users'
const keyword = ref<string>()
const query = ref({
    pageSize: 5,
    requestPage: 1,
})
const total = ref<number>(0)

interface User {
    avater: string;
    createTime: Date;
    email: string;
    gender: number;
    id: number;
    integration: number;
    isDeleted: 0 | 1;
    nickname: string;
    password: string;
    phoneNumber: string;
    status: boolean;
    updateTime: Date;
    username: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

const tableData = ref<User[]>([])
const getUserlist = async () => {
    const res = await getUserlistApi(query.value)
    res.data.records.map((item: any) => {
        item.status = Boolean(item.status)
    })
    tableData.value = res.data.records
    total.value = res.data.totalElements
}
getUserlist()
</script>

<style lang="scss" scoped>
#users {
    .el-breadcrumb {
        margin-bottom: 20px;
    }
    .header {
        .input {
            width: 30%;
        }
    }
    .el-pagination {
        margin-top: 20px;
    }
}
</style>