export const studentSchema = `#graphql
scalar Date
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

type Query {
    getStudents: [Student],
    getStudent(input: StudentInput!): Student
}

type Mutation {
    createStudent(input: StudentInput!): Student
    updateStudent(input: StudentInput!, update: StudentInput!): Student
    deleteStudent(input: StudentInput!): Student
  }
`;
export default studentSchema;