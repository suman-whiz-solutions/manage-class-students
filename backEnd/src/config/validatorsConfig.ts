import Joi from 'joi'
const studentSchema=Joi.object({
    name:Joi.string().required().lowercase(),
    roll:Joi.number().required()
    
})
export default {studentSchema};