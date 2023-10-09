<template>
    <div id="users">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <div class="header">
                <el-input v-model="keyword" placeholder="请输入" class="input" clearable>
                    <template #append>
                        <el-button :icon="Search" @click="handleSearch" />
                    </template>
                </el-input>
                <el-button type="danger" size="default" @click="disableUsers">批量禁用</el-button>
                <el-button type="primary" size="default" @click="enableUsers">批量解禁</el-button>
            </div>

            <el-table :data="searchRes.length ? searchRes : tableData" @selection-change="handleChange">
                <el-table-column type="selection" width="55" />
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
import { getUserlistApi, disableOrEndisaleUserApi } from '@/apis/users'
import { ElMessage } from 'element-plus'
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
// 选择的用户
const selectedUsers = ref<User[]>([])

const handleChange = (val:User[]) => {
  selectedUsers.value = val
}

// 批量禁用（筛选未被禁用的用户数组）
const disableUsers = async() => {
    selectedUsers.value = selectedUsers.value.filter((user) => !user.status)
    const ids = selectedUsers.value.map((user) => user.id)
    const res = await disableOrEndisaleUserApi(ids)
    ElMessage.success(res.message)
    getUserlist()
}
// 批量解禁（筛选已经被禁用的用户数组）
const enableUsers = async() => {
    selectedUsers.value = selectedUsers.value.filter((user) => user.status)
    const ids = selectedUsers.value.map((user) => user.id)
    const res = await disableOrEndisaleUserApi(ids)
    ElMessage.success(res.message)
    getUserlist()
}
// 搜索用户
const searchRes = ref<User[]>([])
const handleSearch = () => {
    searchRes.value = tableData.value.filter((user) => 
        user.username.toLocaleLowerCase().indexOf(keyword.value.toLocaleLowerCase())!= -1
    )
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
            margin-right: 10px
        }
    }
    .el-pagination {
        margin-top: 20px;
    }
}
</style>