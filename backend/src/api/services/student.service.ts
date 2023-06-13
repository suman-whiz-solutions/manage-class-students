import { IStudent, IStudentsArgs, SortDirection } from '../interfaces/Student';
import Student from '../models/student.model';

const getAllStudentFunction = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await Student.find();
            if (!student) {
                resolve({ student, message: `student not found`, success: false, statusCode: 404 });
            }
            resolve(student);
        } catch (err) {
            reject(`Error occured: ${err}`);
        }
    });
};

const getStudentByIdFunction = async (filter: object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await Student.findOne(filter).exec();
            if (!student) {
                resolve({ student, message: `Student not found for ${filter}`, success: false, statusCode: 404 });
            }
            resolve(student);
        } catch (err) {
            reject(`Error occured: ${err}`);
        }
    });
};

const createStudentFunction = async (student: IStudent) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newStudent = new Student(student);
            await newStudent.save();
            resolve(newStudent);
        } catch (err) {
            reject(`Error creating student: ${err}`);
        }
    });
};

const updateStudentFunction = async (filter: object, student: IStudent) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedStudent = await Student.findOneAndUpdate(filter, student, {
                new: true,
            }).exec();
            resolve(updatedStudent);
        } catch (err) {
            reject(`Error updating student: ${err}`);
        }
    });
};

const deleteStudentFunction = async (filter: object) => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await Student.findOneAndDelete(filter).exec();
            resolve(student);
        } catch (err) {
            reject(`Error deleting student: ${err}`);
        }
    });
};

const studentService = {
    getAllStudents: getAllStudentFunction,
    getStudentById: getStudentByIdFunction,
    createNewStudent: createStudentFunction,
    updateStudent: updateStudentFunction,
    deleteStudent: deleteStudentFunction,
}

export default studentService;