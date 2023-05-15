export const classSchema = `#graphql
    type Class {
        id:ID
        name:String
        head:String
        floor:String
    }
    input ClassInput {
        name:String!
        head:String
        floor:String
    }
    input ClassFilter {
        name:String
        head:String
        floor:String
        limit:Int
        pageNo:Int
        sortField:ClassSortField
        sortOrder:ClassSortOrder
    }
    enum ClassSortField {
        NAME
        FLOOR
    }
    enum ClassSortOrder{
        ASC
        DESC
    }
    type ClassList {
        classes:[Class!]!
        total:Int!
        limit:Int!
        pageNo:Int!
    }
    type Query {
        getAllClasses(filter:ClassFilter):ClassList
        getClass(id:ID):Class
    }
    type Mutation {
        addNewClass(input:ClassInput!):Class
        updateClass(id:ID,input:ClassInput!):Class
        deleteClass(id:ID):Class
    }
`