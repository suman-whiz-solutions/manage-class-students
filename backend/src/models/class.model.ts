import mongoose from "mongoose";
import { IClass } from "../interfaces/Class";

const classSchema = new mongoose.Schema<IClass>({
    name: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    head: {
        type: String,
        required: true
    },
})

const ClassModel = mongoose.model<IClass>("class", classSchema);
export { ClassModel };