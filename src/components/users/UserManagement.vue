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
                <el-popconfirm
                    width="220"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="你确定要禁用这些用户吗?"
                    @confirm="disableUsers"
                >
                    <template #reference>
                        <el-button type="danger" size="default">批量禁用</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm
                    width="220"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="你确定要解禁这些用户吗?"
                    @confirm="enableUsers"
                >
                    <template #reference>
                        <el-button type="danger" size="default">批量解禁</el-button>
                    </template>
                </el-popconfirm>
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
                            <el-switch
                                style="--el-switch-on-color: #ff4949"
                                v-model="scope.row.status" 
                                @change="toggleUsers([scope.row.id])"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="openEditFormDialog(scope.row)">编辑</el-button>
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

        <el-button text @click="dialogFormVisible = true">
            open a Form nested Dialog
        </el-button>

        <el-dialog v-model="dialogFormVisible" title="修改用户信息" width="400px">
            <el-form ref="editFormRef" :model="editForm" :rules="rules">
            <el-form-item label="昵称" prop="nicknName">
                <el-input v-model="editForm.nicknName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机" prop="phoneNumber">
                <el-input v-model="editForm.phoneNumber" autocomplete="off" />
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEdit">
                确认
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Search, InfoFilled } from '@element-plus/icons-vue'
import { getUserlistApi, disableOrEndisaleUserApi, updateUserApi } from '@/apis/users'
import { ElMessage, FormInstance } from 'element-plus'
import { rules } from '@/rules/userinfo' 
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

// 编辑用户信息的dialog
const dialogFormVisible = ref<boolean>(false)
// 编辑用户表单
interface EditForm {
    nicknName: string;
    phoneNumber: string;
}
const editForm  = ref<EditForm>({
    nicknName: '',
    phoneNumber: '',
})

const handleChange = (val:User[]) => {
  selectedUsers.value = val
}

// 打开编辑用户dialog
const editUserId = ref<number>(-1)
const editFormRef = ref<FormInstance>()
const openEditFormDialog = (row:User) => {
    dialogFormVisible.value = true
    editForm.value.nicknName = row.nickname
    editForm.value.phoneNumber = row.phoneNumber
    editUserId.value = row.id
}
// 更新用户信息
const handleEdit = async() => {
    await editFormRef.value?.validate()
    await updateUserApi(editUserId.value, editForm.value)
    ElMessage.success('修改用户信息成功！')
    dialogFormVisible.value = false
    getUserlist()
}

// 获取用户id
const getUserid = (users:User[]) => {
    return users.map((user) => user.id)
}
// 切换用户禁用状态
const toggleUsers = async(ids?: number[]) => {
    const targetIds = ids ? ids : getUserid(selectedUsers.value)
    if(!targetIds.length) {
        ElMessage.error('未选择任何用户！')
        return
    }
    const res = await disableOrEndisaleUserApi(ids)
    ElMessage.success(res.message)
    getUserlist()
}

// 批量禁用（筛选未被禁用的用户数组）
const disableUsers = async() => {
    selectedUsers.value = selectedUsers.value.filter((user) => !user.status)
    toggleUsers()
}
// 批量解禁（筛选已经被禁用的用户数组）
const enableUsers = async() => {
    selectedUsers.value = selectedUsers.value.filter((user) => user.status)
   toggleUsers()
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