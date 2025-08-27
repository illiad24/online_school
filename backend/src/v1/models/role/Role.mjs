import mongoose from 'mongoose'

const { Schema } = mongoose

const roleSchema = new Schema({
    title: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
})

const Role = mongoose.model('Role', roleSchema)
export default Role
