<template>
  <div id="tableHeader">
    <h1>学生信息</h1>
  </div>
  <div id="tableContainer">
    <el-table :data="displayedData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="auto"/>
      <el-table-column prop="studentId" label="学生ID" width="auto"/>
      <el-table-column prop="studentName" label="学生姓名" width="auto"/>
      <el-table-column prop="gender" label="性别" width="auto"/>
      <el-table-column prop="age" label="年龄" width="auto"/>
      <el-table-column prop="nativePlace" label="籍贯" width="auto"/>
      <el-table-column prop="identity" label="身份" width="auto"/>

      <el-table-column label="操作" width="auto">
        <template #default="scope">
          <el-button type="info" @click="handleEdit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="编辑学生信息">
      <el-form :model="form" ref="studentForm" label-width="80px">
        <el-form-item label="学生ID">
          <el-input v-model="form.studentId"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="form.nativePlace"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="form.identity"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="saveChanges" type="primary" style="margin-right: 50px">保存修改</el-button>
        <el-popconfirm
            width="auto"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon-color="#626AEF"
            title="确定要删除吗？"
            @confirm="deleteStudent"
            @cancel="dialogFormVisible = false"
        >
          <template #reference>
            <el-button type="danger" style="margin-left: 50px">删除学生</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-dialog>
    <div class="pagination-block">
      <div class="demonstration"></div>
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
import bus from "@/Util/EventBus";

export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pagerCount: 10,
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        studentId: "",
        studentName: "",
        gender: "",
        age: "",
        nativePlace: "",
        identity: "",
      },
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

    handleEdit(index) {
      this.dialogFormVisible = true;
      const studentStore = useStudentStore();
      studentStore.deleteStudentId = studentStore.studentList[index].studentId;
      this.form.studentId = studentStore.studentList[index].studentId;
      this.form.age = studentStore.studentList[index].age;
      this.form.studentName = studentStore.studentList[index].studentName;
      this.form.gender = studentStore.studentList[index].gender;
      this.form.nativePlace = studentStore.studentList[index].nativePlace;
      this.form.identity = studentStore.studentList[index].identity;
    },


    async saveChanges() {
      // 保存修改
    },

    async deleteStudent() {
      const studentStore = useStudentStore();
      try {
        if (await studentStore.deleteStudentByStudentId(studentStore.deleteStudentId)) {
          console.log("删除成功", studentStore.deleteStudentId);
          await this.fetchData();
          bus.emit("student-delete-success")
        }
      } catch (error) {
        console.error("删除操作被取消", error);
      }
      this.dialogFormVisible = false;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style>
#tableContainer {
  width: 100%;
  height: 100vh;
}

.pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.demonstration {
  margin-right: 20px;
}
</style>
