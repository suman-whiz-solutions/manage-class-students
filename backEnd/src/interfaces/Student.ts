export interface IStudent {
    id?: any,
    classId: string,
    name: string,
    roll: number,
    father: string,
    address: string,
    dob: Date,
}

export interface IStudentList {
    students: IStudent[]
    total: number
    limit: number
    pageNo: number
}

export interface IStudentFilter {
    name?: string
    roll?: number
    father?: string
    limit?: number
    pageNo?: number
    sortField?: IStudentFilterSortField
    sortOrder?: IStudentFilterSortOrder
}
export enum IStudentFilterSortOrder {
    ASC="ASC",
    DESC="DESC"
}
export enum IStudentFilterSortField {
    NAME="name",
    ROLL="roll",
    DOB="dob"
}