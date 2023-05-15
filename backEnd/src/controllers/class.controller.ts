import { IClass, IClassList } from "../interfaces/Class"
import ClassService from "../services/class.service"

const classController = {
    /** Graphql Queries */
    Query: {
        /**
         * Get all classes query
         * @returns Promise<IClass[] | Error>
         */
        getAllClasses: async (parent: any, args: any): Promise<IClassList | Error> => {
            try {
                const classes = await ClassService.getAllClasses(args?.filter);
                return classes;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Get a class details query
         * @param parent : any
         * @param args : any
         * @returns Promise<IClass | Error | null>
         */
        getClass: async (parent: any, args: any): Promise<IClass | Error | null> => {
            try {
                const classData = await ClassService.getAClass(args.id);
                return classData;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        }
    },
    /** Graphql Mutations */
    Mutation: {
        /**
         * Add new class controller
         * @param parent : any
         * @param args : IClass
         * @returns Promise<IClass | Error> 
         */
        addNewClass: async (parent: any, args: any): Promise<IClass | Error> => {
            try {
                const addClass = await ClassService.addClass(args.input);
                return addClass;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Update a class details controller
         * @param parent : any
         * @param args : IClass
         * @returns Promise<IClass | Error | null>
         */
        updateClass: async (parent: any, { id, ...args }: any): Promise<IClass | Error | null> => {
            try {
                const updateClass = await ClassService.updateClass(id, args.input);
                return updateClass;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
        /**
         * Delete a class controller
         * @param parent : any
         * @param args : IClass
         * @returns Promise<IClass | Error | null> 
         */
        deleteClass: async (parent: any, { id }: any): Promise<IClass | Error | null> => {
            try {
                const deleteClass = await ClassService.deleteClass(id);
                return deleteClass;
            } catch (error) {
                return Error(JSON.stringify(error));
            }
        },
    }
}

export { classController };