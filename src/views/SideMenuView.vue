<template>
  <div class="sidebar-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        style="height: 100vh; overflow-y: auto;"
        default-active="1"
    >
      <el-menu-item index="1" @click="handleMouseClick1">
        <el-icon>
          <House/>
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <user/>
          </el-icon>
          <span>学生管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="handleMouseClick2_1">学生列表
          </el-menu-item>
          <el-menu-item index="2-2" @click="handleMouseClick2_2">查找学生
          </el-menu-item>
          <el-menu-item index="2-3" @click="handleMouseClick2_3">添加学生
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {User, House} from '@element-plus/icons-vue';
import bus from '../Util/EventBus';
import router from "@/router";

export default {
  data() {
    return {
      isCollapse: true
    };
  },
  components: {
    House,
    User
  },
  mounted() {
    this.handleMouseClick1()
  },
  methods: {
    handleMouseClick1() {
      router.push({name: 'Home'});
    },
    handleMouseClick2_1() {
      router.push({name: 'StudentList'});
      bus.emit('studentListUpdate')
    },
    handleMouseClick2_2() {
      router.push({name: 'FindStudent'});
    },
    handleMouseClick2_3() {
      router.push({name: 'AddStudent'});
    },
    handleMouseEnter() {
      this.isCollapse = false;
    },
    handleMouseLeave() {
      this.isCollapse = true;
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  position: relative;
}
</style>
