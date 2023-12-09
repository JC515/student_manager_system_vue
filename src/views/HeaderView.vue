<template>
  <el-header class="custom-header">
    <el-row type="flex" align="middle">
      <el-col :span="2" style="margin-right: 30px">
        <img src="../assets/1.png" alt="" width="50px" height="50px" @click="backHome">
      </el-col>
      <el-col :span="8">
        <div class="artistic-title">
          欢迎使用学生管理系统
        </div>
      </el-col>

      <el-col :span="2" :offset="10">
        <div class="user-profile">
          <span style="margin-right: 20px">admin</span>
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

<script>
import {ArrowDown} from '@element-plus/icons-vue'
import router from "@/router";
import {useUserStore} from "@/stores/user";

export default {
  components: {
    ArrowDown,
  },
  methods: {
    backHome() {
      router.push({name: 'Home'});

    },
    handleCommand(command) {
      if (command === 'logout') {
        const user = useUserStore()
        user.setAuthentication(false)
        router.push('/login')
      }
    },
  },
}
</script>

<style scoped>
.artistic-title {
  font-size: 24px;
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
