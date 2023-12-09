<template>
  <div>
    <h1>查找学生</h1>

    <div class="center-container">
      <el-row class="row-center">
        <el-col :span="10" style="">
          <el-form-item label="请输入学生ID">
            <el-input v-model="input" placeholder="" autosize/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleClick">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <div v-if="showData">
      <el-table :data="displayedData" style="width: 100%">
        <el-table-column prop="studentId" label="学生ID" width="auto"/>
        <el-table-column prop="studentName" label="学生姓名" width="auto"/>
        <el-table-column prop="gender" label="性别" width="auto"/>
        <el-table-column prop="age" label="年龄" width="auto"/>
        <el-table-column prop="nativePlace" label="籍贯" width="auto"/>
        <el-table-column prop="identity" label="身份" width="auto"/>
        <el-table-column label="操作" width="auto">
          <el-button type="info" @click="handleEdit">编辑</el-button>
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
    </div>
  </div>
</template>

<script>
import {useStudentStore} from "@/stores/student";
import bus from "@/Util/EventBus";
import {useLogStore} from "@/stores/log";

export default {
  data() {
    return {
      input: '',
      showData: false,
      displayedData: [],
      dialogFormVisible: false,
      form: {
        studentId: "",
        studentName: "",
        gender: "",
        age: "",
        nativePlace: "",
        identity: "",
      },
    }
  },
  methods: {
    async handleClick() {
      await this.getStudentById(this.input);
      const studentStore = useStudentStore();
      if (studentStore.student === null) {
        bus.emit('errorMessage', "查询的学生ID不存在")
        this.showData = false
      } else {
        if (this.displayedData.length === 1)
          this.displayedData.pop()
        this.displayedData.push(studentStore.student)
        this.showData = true
        bus.emit('successMessage', "查询成功")
        const log = useLogStore()
        log.addLog({
          name: '查找学生',
          description: '查找了学生，姓名：' + studentStore.student.studentName + '，学号：' + studentStore.student.studentId,
          time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      }
    },
    async getStudentById() {
      const studentStore = useStudentStore();
      await studentStore.getStudentById(this.input);
    },
    handleEdit() {
      this.dialogFormVisible = true;
      this.form.studentId = this.displayedData[0].studentId;
      this.form.studentName = this.displayedData[0].studentName;
      this.form.gender = this.displayedData[0].gender;
      this.form.age = this.displayedData[0].age;
      this.form.nativePlace = this.displayedData[0].nativePlace;
      this.form.identity = this.displayedData[0].identity;
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

        await this.getStudentById(this.input);
        if (this.displayedData.length === 1)
          this.displayedData.pop()
        this.displayedData.push(studentStore.student)
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
    async deleteStudent() {
      const studentStore = useStudentStore();
      const tempName = this.form.studentName;
      const tempId = this.form.studentId;
      try {
        if (await studentStore.deleteStudentByStudentId(this.input)) {
          bus.emit("successMessage", '删除成功')
          const log = useLogStore()
          log.addLog({
            name: '删除学生',
            description: '删除了学生，姓名：' + tempName + '，学号：' + tempId,
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
      this.input = ''
      this.displayedData.pop()
      this.showData = false
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
  }
}
</script>

<style scoped>
.center-container {

}

.row-center {
  justify-content: center;
}
</style>
