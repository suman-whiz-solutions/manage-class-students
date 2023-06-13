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

export interface IStudentFilter {
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

export enum StudentSortField {
    FIRSTNAME = "firstName",
    LASTNAME = "lastName",
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export interface IStudentSort {
    field?: StudentSortField;
    direction?: SortDirection;
}

export interface IStudentsArgs {
    filter?: IStudentFilter;
    limit?: number;
    page?: number;
    sort?: IStudentSort;
}
