import {ref} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

export const useStudentStore = defineStore('student', () => {
    const studentList = ref([]);
    const deleteStudentId = ref(0)
    let student = ref({})

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

    async function getStudentById(studentId) {
        try {
            const response = await axios.get(`http://localhost:8080/student/getStudentById?Id=${studentId}`);
            student.value = response.data.data;
            // gender 1设置为男 2设置为女
            student.value = {
                ...student.value,
                gender: student.value.gender.toString() === '1' ? '男' : '女',
                identity: student.value.identity.toString() === '1' ? '群众' : student.value.identity.toString() === '2' ? '团员' : student.value.identity.toString() === '3' ? '党员' : '未知'
            }
            console.log(student.value);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateStudent(student) {
        try {
            switch (student.gender) {
                case '男':
                    student.gender = 1;
                    break;
                default:
                    student.gender = 2;
            }

            switch (student.identity) {
                case '群众':
                    student.identity = 1;
                    break;
                case '团员':
                    student.identity = 2;
                    break;
                default:
                    student.identity = 3;
            }
            console.log(student);

            await axios.put(`http://localhost:8080/student/updateStudentByStudentId`, student);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async function deleteStudentByStudentId(studentId) {
        try {
            console.log(`http://localhost:8080/student/deleteStudentById?Id={}`, studentId)
            await axios.delete(`http://localhost:8080/student/deleteStudentById?Id=${studentId}`);
            return true;
        } catch (error) {
            return false;
        }
    }


    return {
        studentList,
        deleteStudentId,
        student,
        deleteStudentByStudentId,
        fetchStudentList,
        updateStudent,
        getStudentById
    };
});
