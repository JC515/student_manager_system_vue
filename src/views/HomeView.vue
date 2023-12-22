<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card" style="width: auto; height: 80vh; margin: 50px">
        <h1>快捷工具：</h1>
        <div class="quick-tools">
          <router-link to="/student_manager_system/studentList">
            <el-icon>
              <List/>
            </el-icon>
            <span>学生列表</span>
          </router-link>
          <router-link to="/student_manager_system/findStudent">
            <el-icon>
              <Position/>
            </el-icon>
            <span>查找学生</span>
          </router-link>
          <router-link to="/student_manager_system/addStudent">
            <el-icon>
              <Plus/>
            </el-icon>
            <span>添加学生</span>
          </router-link>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" style="width: auto; max-height: 80vh; margin: 50px; overflow-y: auto; height: 80vh">
        <h1>代办事项：</h1>
        <div class="todo-section">
          <span><el-input v-model="newTodo" placeholder="请输入待办事项" class="todo-input"/></span>
          <span><el-button @click="addTodo" type="primary" class="add-todo-btn">添加</el-button></span>
          <ul v-if="todoList.length !== 0" class="todo-list">
            <li v-for="(todoItem, index) in todoList" :key="index">
              <span>{{ todoItem }}</span>
              <el-button @click="removeTodo(index)" type="text" class="remove-todo-btn">删除</el-button>
            </li>
          </ul>
          <div v-else class="no-todo-msg">
            暂无代办事项
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" style="width: auto; max-height: 80vh; margin: 50px; overflow-y: auto; height: 80vh">
        <h1>日志记录：</h1>
        <div class="log-section">
          <ul v-if="logData.length!==0" class="log-list">
            <li v-for="(logItem, index) in logData" :key="index" class="log-item">
              <span>{{ logItem.description }}</span>
              <br>
              <span>操作时间：{{ logItem.time }}</span>
              <br>
              <el-button @click="deleteLog(index)" type="text" class="remove-log-btn">删除</el-button>
            </li>
            <el-button @click="clearLog" type="default">清空日志</el-button>
          </ul>
          <div v-else class="no-log-msg">
            暂无日志记录
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {defineComponent} from "vue";
import {List, Plus, Position} from "@element-plus/icons-vue";
import {useLogStore} from "@/stores/log";
import {useToDoStore} from "@/stores/todo";
import bus from "@/Util/EventBus";

export default defineComponent({
  components: {Position, Plus, List},
  data() {
    const log = useLogStore();
    const logData = log.logs;
    const todo = useToDoStore();
    const todoList = todo.todoList;

    return {
      logData,
      todoList,
      newTodo: '',
    };
  },
  methods: {
    deleteLog(index) {
      useLogStore().deleteLog(index);
    },
    addTodo() {
      if (this.newTodo === '') {
        bus.emit('errorMessage', '代办事项不能为空')
        return
      }
      useToDoStore().addTodo(this.newTodo);
      this.newTodo = '';
    },
    removeTodo(index) {
      useToDoStore().removeTodo(index);
    },
    clearLog() {
      useLogStore().clearLogs();
      this.logData = []
    }
  },
});
</script>
<style scoped>
.quick-tools {
  display: flex;
  justify-content: space-around;
}

.todo-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-input {
  width: 70%;
  margin-bottom: 10px;
  align-self: stretch;
}

.add-todo-btn {
  margin-right: 10px;
  align-self: flex-start;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.remove-todo-btn {
  color: red;
}

.no-todo-msg {
  color: #888;
  margin-top: 10px;
}

.log-section {
  text-align: center;
}

.log-list {
  list-style-type: none;
  padding: 0;
}

.log-item {
  margin-bottom: 10px;
}

.remove-log-btn {
  color: red;
}

.no-log-msg {
  color: #888;
  margin-top: 10px;
}
</style>