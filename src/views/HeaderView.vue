<template>
  <el-header class="custom-header">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="8" style="margin-left: 25px">
        <div class="artistic-title">
          欢迎使用学生管理系统
        </div>
      </el-col>

      <el-col :span="2">
        <div class="user-profile">
          <span class="user-avatar">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </span>
          <span>
            <el-dropdown @command="handleCommand" class="custom-dropdown">
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu class="custom-dropdown-menu">
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
import {ArrowDown} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const handleCommand = (command) => {
  if (command === 'logout') {
    // 处理退出登录逻辑，例如清除用户信息、跳转到登录页面等
    router.push('/login')
  }
}
</script>

<style scoped>
.artistic-title {
  font-size: 24px;
  margin: 0;
  font-style: italic;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 20px;
}

</style>
