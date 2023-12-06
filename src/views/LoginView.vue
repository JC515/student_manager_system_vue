<template>
  <div class="login-container"
       style="background-color: #e6f7ff; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <el-card class="login-card" shadow="hover" style="width: 45%; height: 60%; background-color: #ffffff;">
      <el-row>
        <el-col :span="12">
          <h1 class="title">Welcome！</h1>
        </el-col>
        <el-col :span="12">
          <el-form>
            <el-form-item label="账号">
              <el-input v-model="username" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="请输入密码" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button @click="login" type="primary">登录</el-button>
              <el-button @click="register" type="info" class="register-button">注册</el-button>
              <router-link to="/home">home</router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
};

const register = () => {

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
