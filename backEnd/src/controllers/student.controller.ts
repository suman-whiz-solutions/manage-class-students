import { IStudent, IStudentList } from "../interfaces/Student";
import StudentService from "../services/student.service";

const studentController = {
    /** Graphql Queries */
    Query: {
        /**
         * Get all students query
         * @returns Promise<IStudent[] | Error>
         */
        getAllStudents: async (parent: any, args: any): Promise<IStudentList | Error> => {
            try {
                const students = await StudentService.getAllStudents(args.filter);
                return students;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Get a student details  query
         * @param parent : any
         * @param args : any
         * @returns Promise<IStudent | Error | null>
         */
        getStudentById: async (parent: any, args: any): Promise<IStudent | Error | null> => {
            try {
                const student = await StudentService.getStudentById(args.id);
                return student;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Get a all student details query
         * @param parent : any
         * @param args : any
         * @returns Promise<IStudent[] | Error | null>
         */
        getStudentByClass: async (parent: any, args: any): Promise<IStudent[] | Error | null> => {
            try {
                const students = await StudentService.getStudentByClass(args.classId);
                return students;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        }
    },
    /** Graphql Mutations */
    Mutation: {
        /**
         * Add new student controller
         * @param parent : any
         * @param args : any
         * @returns Promise<IStudent | Error> 
         */
        addNewStudent: async (parent: any, args: any): Promise<IStudent | Error> => {
            try {
                const addStudent = await StudentService.addStudent(args.input);
                return addStudent;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Update a student details controller
         * @param parent : any
         * @param args : IStudent
         * @returns Promise<IStudent | Error | null>
         */
        updateStudent: async (parent: any, { id, ...args }: any): Promise<IStudent | Error | null> => {
            try {
                const updateStudent = await StudentService.updateStudent(id, args.input);
                return updateStudent;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Delete a student controller
         * @param parent : any
         * @param args : IStudent
         * @returns Promise<IStudent | Error | null> 
         */
        deleteStudent: async (parent: any, { id }: any): Promise<IStudent | Error | null> => {
            try {
                const deleteStudent = await StudentService.deleteStudent(id);
                return deleteStudent;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
    }
}

export { studentController };