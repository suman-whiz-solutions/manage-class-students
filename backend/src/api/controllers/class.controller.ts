import classService from '../services/class.service';
interface ClassInterface {
    class?: string;
    createdOn?: Date;
    updatedOn?: Date;
}

const getClassesFunction = async () => {
    try {
        return await classService.getAllClass();
    } catch(err) {
        return { classdata: null, message: `Error occured: ${err}`, success: false, statusCode: 400 };
    }
};

const getClassFunction = async (_: any, filter: any) => {

    console.log("filter:    ", filter);
    try {
        return await classService.getClassById(filter.input);
    } catch(err) {
        return { classdata: null, message: `Error occured: ${err}`, success: false, statusCode: 400 };
    }
};

const createClassFunction = async (_: any, args: any) => {
    console.log("args :::: ", args);
    return await classService.createNewClass(args.input);
};

const updateClassFunction = async (_: any, { filter, ...args }: any) => {
    console.log(filter, args);
    const classdata = await classService.updateClass(args.input, args.update);
    if (!classdata) {
        throw new Error('Class not found');
    }
    return classdata;
};

const deleteClassFunction = async (_: any, filter: any) => {
    const classdata = await classService.deleteClass(filter.input);
    if (!classdata) {
        throw new Error('Class not found');
    }
    return classdata;
}

const classController = {
    Query: {
        getClass: getClassFunction,
        getClasses: getClassesFunction
    },
    Mutation: {
        createClass: createClassFunction,
        updateClass: updateClassFunction,
        deleteClass: deleteClassFunction
    }
    
};
export default classController;