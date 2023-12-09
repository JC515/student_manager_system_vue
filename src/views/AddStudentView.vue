<template>
  <div>
    <h1>添加学生</h1>
  </div>
  <el-card class="student-card" shadow="hover" style="width: 50%; height: auto ;">
    <el-form :model="formData" :rules="formRules" ref="studentForm" label-width="80px">
      <el-form-item label="学生ID" prop="studentId">
        <el-input v-model="formData.studentId"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="studentName">
        <el-input v-model="formData.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学生性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学生年龄" prop="age">
        <el-input v-model.number="formData.age" type="number"></el-input>
      </el-form-item>
      <el-form-item label="学生籍贯" prop="nativePlace">
        <el-input v-model="formData.nativePlace"></el-input>
      </el-form-item>
      <el-form-item label="学生身份" prop="identity">
        <el-radio-group v-model="formData.identity">
          <el-radio :label="1">群众</el-radio>
          <el-radio :label="2">团员</el-radio>
          <el-radio :label="3">党员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="margin-right: 50px">提交</el-button>
        <el-button type="primary" @click="resetForm" style="margin-right: 50px">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {useStudentStore} from "@/stores/student";
import bus from "@/Util/EventBus";
import {useLogStore} from "@/stores/log";

export default {
  data() {
    return {
      formData: {
        studentId: '',
        studentName: '',
        gender: 1,
        age: null,
        nativePlace: '',
        identity: 1,
      },
      formRules: {
        studentId: [
          {required: true, message: '请输入学生ID', trigger: 'blur'},
          {max: 10, message: '学生ID不能超过10个字符', trigger: 'blur'},
        ],
        studentName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {max: 10, message: '学生姓名不能超过10个字符', trigger: 'blur'},
        ],
        gender: [
          {required: true, message: '请选择学生性别', trigger: 'change'},
        ],
        age: [
          {required: true, message: '请输入学生年龄', trigger: 'blur'},
          {type: 'number', message: '学生年龄必须为数字', trigger: 'blur'},
          {type: 'number', min: 0, max: 200, message: '学生年龄必须在1到200之间', trigger: 'blur'},
        ],
        nativePlace: [
          {required: true, message: '请输入学生籍贯', trigger: 'blur'},
          {max: 30, message: '学生籍贯不能超过30个字符', trigger: 'blur'},
        ],
        identity: [
          {required: true, message: '请选择学生身份', trigger: 'change'},
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      if (this.formData.studentId === '' || this.formData.studentName === '' || this.formData.age === null || this.formData.nativePlace === '') {
        bus.emit('errorMessage', "请将信息填写完整")
        return
      }
      const studentStore = useStudentStore();
      if (await studentStore.addStudent(this.formData)) {
        bus.emit('successMessage', "添加学生成功")
        const log = useLogStore()
        log.addLog({
          name: '添加学生',
          description: '添加了学生，姓名：' + this.formData.studentName + '，学号：' + this.formData.studentId,
          time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });

      } else {
        bus.emit('errorMessage', "学生ID已存在")
      }
      this.resetForm()
    },
    resetForm() {
      this.$refs.studentForm.resetFields();
    },
  },
};
</script>

<style scoped>
.student-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
}
</style>
