export interface IClass {
    id?: any,
    name: string,
    head: string,
    floor: string
}

export interface IClassList {
    classes: IClass[],
    total: number,
    limit: number,
    pageNo: number
}

export interface IClassFilter {
    name?: string
    head?: string
    floor?: string
    limit?: number
    pageNo?: number
    sortField?: IClassFilterSortField
    sortOrder?: IClassFilterSortOrder
}

export enum IClassFilterSortField {
    NAME = "name",
    FLOOR = "floor"
}
export enum IClassFilterSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}