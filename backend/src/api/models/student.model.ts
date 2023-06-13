import { IStudent } from '../interfaces/Student';
import mongoose, { Schema, Document } from 'mongoose';

const StudentSchema: Schema = new Schema({
  firstName: { type: String, required: true, default: '' },
  lastName: { type: String, default: '' },
  class: { type: String, default: '' },
  classId: { type: String, required: true, default: 0},
  roll: {type: Number,required: true, unique: true, index: true},
  father: { type: String, required: true, default: ''},
  address: { type: String, required: true, default: ''},
  dob: {type: Date, default: null},
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() }
});

export default mongoose.model<IStudent & Document>('Student', StudentSchema, 'student');
