import mongoose from "mongoose";
import { IStudent } from "../interfaces/Student";

const studentSchema = new mongoose.Schema<IStudent>({
    classId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    father: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
})

const StudentModel = mongoose.model<IStudent>("student", studentSchema);
export { StudentModel };