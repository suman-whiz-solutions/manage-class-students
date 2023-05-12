const mongoose = require("mongoose");

const StudentClass = mongoose.model("StudentClass", {
  rollNumber: Number,
  className: String,
  studentId:  String,


});

module.exports = { StudentClass };