import studentService from '../services/student.service';
import { IStudent, IStudentsArgs, IStudentList } from 'api/interfaces/Student';
interface StudentInterface {
    classId?: string
    class?: string
    firstName?:  string
    lastName?:  string
    roll?: number
    father?: string
    address?: string
    dob?: Date    
    createdOn?:  Date
    updatedOn?:  Date
}

const getStudentsFunction = async () => {
    try {
        return await studentService.getAllStudents();
    } catch(err) {
        return { student: null, message: `Error occured: ${err}`, success: false, statusCode: 400 };
    }
};

const getStudentsFunctionByFilter = async (_: any, args: any) => {
    console.log(args);
    try {
        const student =  await studentService.getAllStudentsByFilter(args.filter);
    if (!student) {
        throw new Error('Student not found');
    }
    console.log("student: ", student);
    return student;
    } catch (err) {
        return { student: null, message: `Error occured: ${err}`, success: false, statusCode: 400 };
    }
};


const getStudentFunction = async (_: any, filter: any) => {
    try {
        return await studentService.getStudentById(filter.input);
    } catch(err) {
        return { student: null, message: `Error occured: ${err}`, success: false, statusCode: 400 };
    }
};

const createStudentFunction = async (_: any, args: any) => {
    return await studentService.createNewStudent(args.input);
};

const updateStudentFunction = async (_: any, { filter, ...args }: any) => {
    
    const student = await studentService.updateStudent(args.update, args.input);
    if (!student) {
        throw new Error('Student not found');
    }
    return student;
};

const deleteStudentFunction = async (_: any, filter: any) => {
    console.log("filter:::: ", filter);
    const student = await studentService.deleteStudent(filter.input);
    if (!student) {
        throw new Error('Student not found');
    }
    return student;
}

const studentController = {
    Query: {
        getStudent: getStudentFunction,
        getStudents: getStudentsFunction,
        getStudentsByFilter: getStudentsFunctionByFilter
    },
    Mutation: {
        createStudent: createStudentFunction,
        updateStudent: updateStudentFunction,
        deleteStudent: deleteStudentFunction
    }
};
export default studentController;