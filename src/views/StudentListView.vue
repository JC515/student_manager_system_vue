<template>
  <div id="tableHeader"><h1>学生信息</h1></div>
  <div id="tableContainer">
    <el-table :data="displayedData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="auto"/>
      <el-table-column prop="studentId" label="学生ID" width="auto"/>
      <el-table-column prop="studentName" label="学生姓名" width="auto"/>
      <el-table-column prop="gender" label="性别" width="auto"/>
      <el-table-column prop="age" label="年龄" width="auto"/>
      <el-table-column prop="nativePlace" label="籍贯" width="auto"/>
      <el-table-column prop="identity" label="身份" width="auto"/>
    </el-table>
    <div class="example-pagination-block">
      <div class="example-demonstration"></div>
      <el-pagination
          layout="prev, pager, next"
          :total="tableData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {useStudentStore} from "@/stores/student";

export default {
  data() {
    return {
      tableData: [],
      pageSize: 15,
      pagerCount: 10,
      currentPage: 1,
    };
  },
  computed: {
    displayedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.fetchData();
    },

    async fetchData() {
      const studentStore = useStudentStore();
      await studentStore.fetchStudentList();
      this.tableData = studentStore.studentList;
    },
  },
  mounted() {
    this.fetchData();
  },
}
;
</script>

<style>
#tableContainer {
  width: 100%;
  height: 100vh;
}

.example-pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.example-demonstration {
  margin-right: 20px;
}
</style>

