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

const getAllStudentFunctionByFilter = async (filter: IStudentsFilter = {}): Promise<IStudentList | Error> => {
    try {
        
        let queryObj: any = {};
        let sort: any = {};
        filter.limit = filter.limit || 10;
        filter.pageNo = filter.pageNo || 1;
        const { name, roll, father, limit, pageNo, sortField, sortOrder } = filter;
        if (name) {
            queryObj['name'] = name
        }
        if (roll) {
            queryObj['roll'] = roll
        }
        if (father) {
            queryObj['father'] = father
        }
        if (sortField) {
            sort[sortField.toLowerCase()] = ((sortOrder==IStudentFilterSortOrder.ASC)?1:-1) || 1;
        }
        let skip = (pageNo - 1) * limit;
        let total = await Student.find(queryObj).count();
        let students = await Student.find(queryObj).skip(skip).limit(limit).sort(sort);
        console.log(students, queryObj)
        return { students, total, limit, pageNo };
    } catch (error) {
        return Error(JSON.stringify(error));
    }
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