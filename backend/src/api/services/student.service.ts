import { IStudent, IStudentsArgs, IStudentsFilter, SortDirection, IStudentFilterSortOrder, IStudentList} from '../interfaces/Student';
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

const getAllStudentFunctionByFilter = async (filter: IStudentsFilter = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("filter: ", filter)
            const query = Student.find();
                if (filter.firstName) {
                    query.where("firstName").equals(filter.firstName);
                } else if (filter.roll) {
                    query.where("roll").equals(filter.roll);
                }
                const students = await query.exec();
                if (!students) {
                    resolve({ students, message: `student not found`, success: false, statusCode: 404 });
                }
                resolve(students);
        } catch (error) {
            return Error(JSON.stringify(error));
        }
    });
}


// const getAllStudentFunctionByFilter = async (filter: IStudentsFilter = {}) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const query = Student.find();
//             if (filter.firstName) {
//                 query.where("firstName").equals(filter.firstName);
//             } else if (filter.roll) {
//                 query.where("roll").equals(filter.roll);
//             } 

//             if (sort.field) {
//                 const sortField = sort.field.toLowerCase();
//                 const sortDirection = sort.direction === SortDirection.ASC ? 1 : -1;
//                 query.sort({ [sortField]: sortDirection });
//             }

//             const count = await Student.countDocuments(query);
//             const students = await query.exec();
//             if (!students) {
//                 resolve(students);
//             }

//             const metadata = {
//                 count,
//                 limit,
//                 page,
//             };
//             resolve(students);
//         } catch (err) {
//             reject(`Error occured: ${err}`);
//         }
//     });
// };

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
    getAllStudentsByFilter: getAllStudentFunctionByFilter,
    getStudentById: getStudentByIdFunction,
    createNewStudent: createStudentFunction,
    updateStudent: updateStudentFunction,
    deleteStudent: deleteStudentFunction,
}

export default studentService;