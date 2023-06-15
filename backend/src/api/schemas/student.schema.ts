export const studentSchema = `#graphql
scalar Date

input StudentFilter {
    classId:String
    class:String
    firstName: String
    lastName: String
    roll:Int
    father:String
    address:String
    dob:Date    
    createdOn: Date
    updatedOn: Date
}

type Student {
    _id:ID
    classId:String
    class:String
    firstName: String
    lastName: String
    roll:Int
    father:String
    address:String
    dob:Date    
    createdOn: Date
    updatedOn: Date
}
input StudentInput {
    classId:String
    class:String
    firstName: String
    lastName: String
    roll:Int
    father:String
    address:String
    dob:Date 
    createdOn: Date
    updatedOn: Date
}

enum StudentSortField {
    FIRSTNAME
    LASTNAME
    ROLL
  }

  enum SortDirection {
    ASC
    DESC
  }

  input StudentSort {
    field: StudentSortField!
    direction: SortDirection!
  }

  
type StudentList {
  students:[Student!]!
  total:Int!
  limit:Int!
  pageNo:Int!
}

type Query {
    getStudents: [Student],
    getStudent(filter: StudentFilter,input: StudentInput!): Student
    getStudentsByFilter(filter: StudentFilter): StudentList
}

type Mutation {
    createStudent(input: StudentInput!): Student
    updateStudent(input: StudentInput!, update: StudentInput): Student
    deleteStudent(input: StudentInput!): Student
  }
`;
export default studentSchema;