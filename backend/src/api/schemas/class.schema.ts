// import ClassData from "api/data";
export const classSchema = `#graphql
scalar Date
type ClassData {
    _id: ID
    class: String
    createdOn: Date
    updatedOn: Date
}
input ClassInput {
    class: String
    createdOn: Date
    updatedOn: Date
  }
type Query {
    getClasses: [ClassData]
    getClass(input: ClassInput!): ClassData
}

type Mutation {
    createClass(input: ClassInput!): ClassData
    updateClass(input: ClassInput!, update: ClassInput!): ClassData
    deleteClass(input: ClassInput!): ClassData
  }
`;
export default classSchema;