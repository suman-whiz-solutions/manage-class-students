// IStudent Interface 
export interface IStudent {
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


// for GraphQL queries 
export const STUDENT_FIELDS = `
    fragment STUDENT_FIELDS on Student {
        classId
        class
        firstName
        lastName
        roll
        father
        address
        dob    
        createdOn
        updatedOn
    }`;
    
