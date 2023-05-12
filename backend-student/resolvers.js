const { Student } = require("./models/Student.js");
const {StudentClass} =require("./models/StudentClass.js");
let {users,quotes} =require('./fakedb.js');


// GraphQL Resolvers
const resolvers = {
  Query: {
    welcome: (parent, args) => `Hello ${args.name}`,
    users:()=>users,
    user:(_,{id})=>users.find(user=>user.id == id),
    quotes:()=>quotes,
    iquote:(_,{by})=> quotes.filter((quote)=>quote.by==by), 


    students: async () => await Student.find({}), // return array of students
    student: async (_,args) => await Student.findById(
     
      args.id
      
      ), // return student by id
  },
  


  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });
      await newStudent.save();
      return newStudent;
    },
    update: async (parent, args) => {
      const { id } = args;
      const updatedStudent = await Student.findByIdAndUpdate(id, args);
      if (!updatedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return updatedStudent;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return deletedStudent;
    },

    createClass: async (parent, args) => {
      const { rollNumber, className, studentId } = args;
      const newStudentClass = new StudentClass({
        rollNumber,
        className,
        studentId,
      });
      await newStudentClass.save();
      return newStudentClass;
    },


  },
};

module.exports = { resolvers };