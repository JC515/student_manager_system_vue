import {ref} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

export const useStudentStore = defineStore('student', () => {
    const studentList = ref([]);

    async function fetchStudentList() {
        try {
            const response = await axios.get('http://localhost:8080/student/getList');
            studentList.value = response.data.data;

            let i = 1;

            studentList.value.forEach((item) => {
                item.id = i++;
                // gender 1设置为男 2设置为女
                item.gender = item.gender.toString() === '1' ? '男' : '女';


                // identity 1设置为群众 2设置为团员 3设置为党员
                switch (item.identity) {
                    case 1:
                        item.identity = '群众';
                        break;
                    case 2:
                        item.identity = '团员';
                        break;
                    case 3:
                        item.identity = '党员';
                        break;
                    default:
                        item.identity = '未知';
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchStudentByStudentId(studentId) {
        try {
            const response = await axios.get('http://localhost:8080/student//getStudentById?Id=' + studentId);
            return response.data.data
        } catch (error) {
            console.error(error);
        }
    }

    return {studentList, fetchStudentList};
});
