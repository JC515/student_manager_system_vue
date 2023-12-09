<template>
  <div class="login-container"
       style="background-color: #e6f7ff; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <el-card class="login-card" shadow="hover" style="width: 45%; height: 60%; background-color: #ffffff;">
      <el-row>
        <h1 class="title">学生管理系统登录</h1>
      </el-row>
      <el-row>
        <el-col>
          <el-form>
            <el-form-item label="账号">
              <el-input v-model="username" placeholder="请输入账号" clearable/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="请输入密码" type="password" clearable show-password/>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="rememberMe" @click="handleRememberMe">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button @click="login" type="primary">登录</el-button>
              <el-button @click="register" type="info" class="register-button">注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/user";
import bus from "@/Util/EventBus";
import router from "@/router";

export default {
  data() {
    const user = useUserStore();
    if (user.remember && user.account !== '' && user.password !== '')
      return {
        username: user.account,
        password: user.password,
        rememberMe: user.remember,
      };
    else {
      return {
        username: '',
        password: '',
        rememberMe: false,
      }
    }
  },
  methods: {
    register() {
      bus.emit('loginErrorMessage', "暂时不可注册")
    },
    login() {
      if (this.username === '') {
        bus.emit('loginErrorMessage', "账号不能为空")
        return;
      }
      if (this.password === '') {
        bus.emit('loginErrorMessage', "密码不能为空")
        return;
      }
      if (this.username === 'admin' && this.password === '123456') {
        const user = useUserStore();
        user.setAuthentication(true)
        user.setAccount(this.username)
        user.setPassword(this.password)
        router.push({name: 'Home'});
      }
    },
    handleRememberMe() {
      const user = useUserStore();
      user.setRemember()
      if (user.remember === false) {
        user.setAccount('')
        user.setPassword('')
      }
    }
  },
  created() {
    bus.on('loginErrorMessage', (outMessage) => {
      ElMessage({
        message: outMessage,
        type: 'error',
      })
    })
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-button {
  margin-left: auto;
}
</style>
