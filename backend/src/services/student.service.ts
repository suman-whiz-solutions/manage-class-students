import { IStudent, IStudentFilter, IStudentFilterSortOrder, IStudentList } from "../interfaces/Student";
import { StudentModel } from "../models/student.model";

/**
 * Add a new class in DB
 * @param studentData : IStudent
 * @returns Promise<IStudent | Error>
 */
const addStudentProcess = async (studentData: IStudent): Promise<IStudent | Error> => {
    try {
        const newStudent = new StudentModel(studentData);
        await newStudent.save();
        return newStudent;
    } catch (error) {
        console.log("Add Error", error);
        return Error(JSON.stringify(error));
    }

}
/**
 * Update an existing data by id
 * @param studentData : IStudent
 * @returns Promise<IStudent | Error | null>
 */
const updateStudentProcess = async (id: string, studentData: IStudent): Promise<IStudent | Error | null> => {
    try {
        const updateStudent = await StudentModel.findByIdAndUpdate(id, studentData)
        return updateStudent;
    } catch (error) {
        return Error(JSON.stringify(error));
    }

}
/**
 * Delete an existing data by id
 * @param classData : IStudent
 * @returns Promise<IStudent | Error | null>
 */
const deleteStudentProcess = async (id: string): Promise<IStudent | Error | null> => {
    try {
        const deleteStudent = await StudentModel.findByIdAndDelete(id)
        return deleteStudent;
    } catch (error) {
        return Error(JSON.stringify(error));
    }

}
/**
 * Get all classes from DB
 * @returns Promise<IClass[] | Error>
 */
const getAllStudentsProcess = async (filter: IStudentFilter = {}): Promise<IStudentList | Error> => {
    try {
        let queryObj: any = {};
        let sort: any = {};
        filter.limit = filter.limit || 10;
        filter.pageNo = filter.pageNo || 1;
        const { name, roll, father, classId, limit, pageNo, sortField, sortOrder } = filter;
        if (name) {
            queryObj['name'] = { '$regex': name, '$options': 'i' };
        }
        if (roll) {
            queryObj['roll'] = roll
        }
        if (father) {
            queryObj['father'] = { '$regex': father, '$options': 'i' };
        }
        if (classId) {
            queryObj['classId'] = classId
        }
        if (sortField) {
            sort[sortField.toLowerCase()] = ((sortOrder == IStudentFilterSortOrder.ASC) ? 1 : -1) || 1;
        } else {
            sort["name"] = 1;
        }
        let skip = (pageNo - 1) * limit;
        let total = await StudentModel.find(queryObj).count();

        let students = await StudentModel.aggregate([
            { $match: queryObj },
            { $addFields: { "classObjectId": { "$toObjectId": "$classId" } } },
            { $addFields: { "id": { "$toString": "$_id" } } },
            {
                $lookup: {
                    from: "classes",
                    localField: "classObjectId",
                    foreignField: "_id",
                    as: "class"
                }
            },
            { $unwind: "$class" },
            { $limit: limit },
            { $skip: skip },
            { $sort: sort }
        ])
        // console.log("students", students)
        //console.log("queryObj", queryObj)
        return { students, total, limit, pageNo };
    } catch (error) {
        console.log(error);
        return Error(JSON.stringify(error));
    }
}
/**
 * Get a perticular class details
 * @param id : String
 * @returns Promise<IClass | Error | null>
 */
const getStudentByIdProcess = async (id: String): Promise<IStudent | Error | null> => {
    try {
        return StudentModel.findById(id);
    } catch (error) {
        return Error(JSON.stringify(error));
    }
}

/**
 * Get a perticular class details
 * @param id : String
 * @returns Promise<IClass | Error | null>
 */
const getStudentByClassProcess = async (id: String): Promise<IStudent[] | Error | null> => {
    try {
        return StudentModel.find({ classId: id });
    } catch (error) {
        return Error(JSON.stringify(error));
    }
}

const StudentService = {
    addStudent: addStudentProcess,
    getAllStudents: getAllStudentsProcess,
    getStudentById: getStudentByIdProcess,
    getStudentByClass: getStudentByClassProcess,
    updateStudent: updateStudentProcess,
    deleteStudent: deleteStudentProcess
};
export default StudentService;