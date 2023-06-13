export interface IClass {
    class?: string;
    createdOn?: Date;
    updatedOn?: Date;
}

export interface IClassFilter {
    class?: string;
    createdOn?: Date;
    updatedOn?: Date;
}

export enum ClassSortField {
    CLASS = "class",
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export interface IClassSort {
    field?: ClassSortField;
    direction?: SortDirection;
}

export interface IClasssArgs {
    filter?: IClassFilter;
    limit?: number;
    page?: number;
    sort?: IClassSort;
}
