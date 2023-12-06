<template>
  <div class="sidebar-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        style="height: 100vh; overflow-y: auto;"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <user/>
          </el-icon>
          <span>学生管理</span>
        </template>
        <el-menu-item-group>
          <template #title><span>基本信息</span></template>
          <el-menu-item index="studentList" @click="handleMouseClick">学生列表
          </el-menu-item>
          <!--        </el-menu-item-group>-->
          <!--        <el-menu-item-group title="课程信息">-->
          <!--          <el-menu-item index="1-3">课程列表</el-menu-item>-->
          <!--        </el-menu-item-group>-->
          <!--        <el-menu-item-group title="成绩管理">-->
          <!--          <el-menu-item index="1-4">成绩录入</el-menu-item>-->
        </el-menu-item-group>
      </el-sub-menu>
      <!--      <el-menu-item index="2">-->
      <!--        <el-icon>-->
      <!--          <document/>-->
      <!--        </el-icon>-->
      <!--        <template #title>课程表</template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item index="3">-->
      <!--        <el-icon>-->
      <!--          <document/>-->
      <!--        </el-icon>-->
      <!--        <template #title>考试管理</template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item index="4">-->
      <!--        <el-icon>-->
      <!--          <setting/>-->
      <!--        </el-icon>-->
      <!--        <template #title>系统设置</template>-->
      <!--      </el-menu-item>-->
    </el-menu>

  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {User, Document, Setting} from '@element-plus/icons-vue';
import {useRouter} from "vue-router";

const isCollapse = ref(true);

const route = useRouter();

const handleMouseClick = () => {
  route.push({name: 'StudentList'}); // 使用命名路由跳转
}

const handleMouseEnter = () => {
  isCollapse.value = false;
};

const handleMouseLeave = () => {
  isCollapse.value = true;
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  position: relative;
}

</style>
