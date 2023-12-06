<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <SideMenu></SideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderView></HeaderView>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideMenu from "@/views/SideMenuView.vue";
import HeaderView from "@/views/HeaderView.vue";
</script>
