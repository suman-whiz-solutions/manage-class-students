const gql = require("graphql-tag");
// import {users,quotes} from './fakedb'
let {users,quotes} =require('../fakedb.js');

const typeDefs = gql`


  type Query {
    # For Testing
    greet:String
    users:[User]
    user(id:ID!): User
    quotes:[Quote]
    iquote(by:ID!):[Quote]


    welcome(name: String): String
    students: [Student] #return array of students
    student(id: ID): Student #return student by id

    studentClass: [StudentClass] #return array of students
  }

  type User{
    id: ID
    firstName: String
    lastName: String
    email: String
    password:Int
  }

  type Quote{
        name:String
        by:ID
  }

  type Student {
    id: ID
    firstName: String
    lastName: String
    age: Int
  }

  type StudentClass {
    id: ID
    rollNumber: String
    className: String
    studentId: String
  }


  type Mutation {
    create(firstName: String, lastName: String, age: Int): Student
    update(id: ID, firstName: String, lastName: String, age: Int): Student
    delete(id: ID): Student

    # For Student Class Details
    createClass(rollNumber: String, className: String, studentId: String): StudentClass
  }
`;

module.exports = { typeDefs };