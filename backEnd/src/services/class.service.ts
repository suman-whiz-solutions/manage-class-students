import { IClass, IClassFilter, IClassFilterSortOrder, IClassList } from "../interfaces/Class";
import { ClassModel } from "../models/class.model";

/**
 * Add a new class in DB
 * @param classData : IClass
 * @returns Promise<IClass | Error>
 */
const addClassProcess = async (classData: IClass): Promise<IClass | Error> => {
    try {
        const newClass = new ClassModel(classData);
        await newClass.save();
        return newClass;
    } catch (error) {
        return Error(JSON.stringify(error));
    }

}
/**
 * Update an existing data by id
 * @param classData : IClass
 * @returns Promise<IClass | Error | null>
 */
const updateClassProcess = async (id: String, classData: IClass): Promise<IClass | Error | null> => {
    try {
        const updateClass = await ClassModel.findByIdAndUpdate(id, classData)
        return updateClass;
    } catch (error) {
        return Error(JSON.stringify(error));
    }

}
/**
 * Delete an existing data by id
 * @param classData : IClass
 * @returns Promise<IClass | Error | null>
 */
const deleteClassProcess = async (id: String): Promise<IClass | Error | null> => {
    try {
        const deleteClass = await ClassModel.findByIdAndDelete(id)
        return deleteClass;
    } catch (error) {
        return Error(JSON.stringify(error));
    }

}
/**
 * Get all classes from DB
 * @returns Promise<IClass[] | Error>
 */
const getAllClassesProcess = async (filter: IClassFilter = {}): Promise<IClassList | Error> => {
    try {
        let queryObj: any = {};
        let sort: any = {};
        filter.limit = filter.limit || 10;
        filter.pageNo = filter.pageNo || 1;

        const { name, head, floor, limit, pageNo, sortField, sortOrder } = filter;

        if (name) {
            queryObj['name'] = name
        }
        if (head) {
            queryObj['head'] = head
        }
        if (floor) {
            queryObj['floor'] = floor
        }
        if (sortField) {
            sort[sortField.toLowerCase()] = ((sortOrder == IClassFilterSortOrder.ASC) ? 1 : -1) || 1;
        }
        let skip = (pageNo - 1) * limit;
        let total = await ClassModel.find(queryObj).count();
        let classes = await ClassModel.find(queryObj).skip(skip).limit(limit).sort(sort);
        return { classes, total, limit, pageNo };
    } catch (error) {
        return Error(JSON.stringify(error));
    }
}
/**
 * Get a perticular class details
 * @param id : String
 * @returns Promise<IClass | Error | null>
 */
const getAClassProcess = async (id: String): Promise<IClass | Error | null> => {
    try {
        return ClassModel.findById(id);
    } catch (error) {
        return Error(JSON.stringify(error));
    }
}

const ClassService = {
    addClass: addClassProcess,
    getAllClasses: getAllClassesProcess,
    getAClass: getAClassProcess,
    updateClass: updateClassProcess,
    deleteClass: deleteClassProcess
};
export default ClassService;