<template>
  <div id="tableHeader">
    <h1>学生信息</h1>
  </div>
  <div id="tableContainer">
    <el-table :data="displayedData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="auto" sortable/>
      <el-table-column prop="studentId" label="学生ID" width="auto" sortable/>
      <el-table-column prop="studentName" label="学生姓名" width="auto" sortable/>
      <el-table-column prop="gender" label="性别" width="auto" sortable/>
      <el-table-column prop="age" label="年龄" width="auto" sortable/>
      <el-table-column prop="nativePlace" label="籍贯" width="auto" sortable/>
      <el-table-column prop="identity" label="身份" width="auto" sortable/>

      <el-table-column label="操作" width="auto">
        <template #default="scope">
          <el-button type="info" @click="handleEdit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="编辑学生信息">
      <el-form :model="form" ref="studentForm" label-width="80px">
        <el-form-item label="学生ID">
          <el-input v-model="form.studentId" disabled></el-input>
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
      每页
      <el-input v-model="pageSize" @input="handlePageSizeChange" style="width: 50px"></el-input>
      项
      <div class="demonstration"></div>
      <el-pagination
          layout="prev, pager, next"
          :total="tableData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          @current-change="handleCurrentChange"
      />
    </div>
    <div style="text-align: right;width: 100%">总人数：{{ tableData.length }}</div>
  </div>
</template>

<script>
import {useStudentStore} from "@/stores/student";
import bus from "@/Util/EventBus";
import {useLogStore} from "@/stores/log";

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

      const nowIndex = index + this.pageSize * (this.currentPage - 1)

      studentStore.deleteStudentId = studentStore.studentList[nowIndex].studentId;

      this.form.studentId = studentStore.studentList[nowIndex].studentId;
      this.form.age = studentStore.studentList[nowIndex].age;
      this.form.studentName = studentStore.studentList[nowIndex].studentName;
      this.form.gender = studentStore.studentList[nowIndex].gender;
      this.form.nativePlace = studentStore.studentList[nowIndex].nativePlace;
      this.form.identity = studentStore.studentList[nowIndex].identity;
    },


    async saveChanges() {
      const studentStore = useStudentStore();
      const validationError = this.validateFormData();
      if (validationError) {
        bus.emit('errorMessage', validationError)
        return;
      }

      try {
        await studentStore.updateStudent(this.form);

        await this.fetchData();
        const tempName = this.form.studentName
        const tempId = this.form.studentId

        this.resetForm();

        this.dialogFormVisible = false;
        bus.emit('successMessage', '保存修改成功')
        const log = useLogStore()
        log.addLog({
          name: '修改学生',
          description: '修改了学生，姓名：' + tempName + '，学号：' + tempId,
          time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      } catch (error) {
        console.error("Save operation failed", error);
      }
    },
    validateFormData() {
      if (!['男', '女'].includes(this.form.gender)) {
        return "性别必须为 '男' 或 '女'";
      }

      if (!['群众', '团员', '党员'].includes(this.form.identity)) {
        return "身份必须为 '群众', '团员' 或 '党员'";
      }

      if (this.form.nativePlace.length > 30) {
        return "籍贯长度不能超过30个字符";
      }

      if (this.form.age <= 0 || this.form.age >= 200) {
        return "年龄有误";
      }

      if (this.form.studentName.length > 20) {
        return "学生姓名长度不能超过20个字符";
      }

      return null;
    },

    resetForm() {
      this.form = {
        studentId: "",
        studentName: "",
        gender: "",
        age: "",
        nativePlace: "",
        identity: "",
      };
    },

    async deleteStudent() {
      const studentStore = useStudentStore();
      try {
        if (await studentStore.deleteStudentByStudentId(studentStore.deleteStudentId)) {
          await this.fetchData();
          bus.emit("successMessage", '删除成功')
          const log = useLogStore()
          log.addLog({
            name: '删除学生',
            description: '删除了学生，姓名：' + this.form.studentName + '，学号：' + this.form.studentId,
            time: new Date().toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
          });
        }
      } catch (error) {
        console.error("删除操作出现错误", error);
      }
      this.dialogFormVisible = false;
    },
    handlePageSizeChange() {
      if (parseInt(this.pageSize) >= 1 && parseInt(this.pageSize) <= this.tableData.length) {
        this.pageSize = parseInt(this.pageSize);
        this.currentPage = 1;
        this.fetchData();
      }
    }
  },

  mounted() {
    this.fetchData();
  },
  created() {
    bus.on('studentListUpdate', this.fetchData)
  }
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
