import { IClass, IClasssArgs, SortDirection } from '../interfaces/Class';
import Class from '../models/class.model';

const getAllClassFunction = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const classdata = await Class.find();
            
            if (!classdata) {
                resolve({ classdata, message: `class not found`, success: false, statusCode: 404 });
            }
            resolve(classdata);
        } catch (err) {
            reject(`Error occured: ${err}`);
        }
    });
};

const getClassByIdFunction = async (filter: object) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log("filter data:::::", filter);
            const classdata = await Class.findOne(filter).exec();
            console.log(classdata);
            if (!classdata) {
                resolve({ classdata, message: `Class not found for input ${filter}`, success: false, statusCode: 404 });
            }
            resolve(classdata);
        } catch (err) {
            reject(`Error occured: ${err}`);
        }
    });
};

const createClassFunction = async (classdata: IClass) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newClass = new Class(classdata);
            await newClass.save();
            resolve(newClass);
        } catch (err) {
            reject(`Error creating class: ${err}`);
        }
    });
};

const updateClassFunction = async (filter: object, classdata: IClass) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedClass = await Class.findOneAndUpdate(filter, classdata, {
                new: true,
            }).exec();
            resolve(updatedClass);
        } catch (err) {
            reject(`Error updating class: ${err}`);
        }
    });
};

const deleteClassFunction = async (filter: object) => {
    console.log("filter: ", filter);
    return new Promise(async (resolve, reject) => {
        try {
            console.log("filter2: ", filter);
            const classdata = await Class.findOneAndDelete(filter).exec();
            resolve(classdata);
        } catch (err) {
            reject(`Error deleting class: ${err}`);
        }
    });
};

const classService = {
    getAllClass: getAllClassFunction,
    getClassById: getClassByIdFunction,
    createNewClass: createClassFunction,
    updateClass: updateClassFunction,
    deleteClass: deleteClassFunction,
}

export default classService;