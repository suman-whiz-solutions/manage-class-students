import { IClass } from '../interfaces/Class';
import mongoose, { Schema, Document } from 'mongoose';

const ClassSchema: Schema = new Schema({
  class: { type: String, default: '0', unique: true, required: true, index: true },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() }
});

export default mongoose.model<IClass & Document>('Class', ClassSchema, 'class');
