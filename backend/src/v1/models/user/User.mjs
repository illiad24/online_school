import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcryptjs'

// Створення схеми користувача
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        // validate: {
        //     validator: function (v) {
        //         return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        //             v
        //         )
        //     },
        //     message: (props) =>
        //         'Password must contain at least one letter, one number, and one special character',
        // },
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'Email must be unique'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    courses: {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    },
    userImage: {
        type: String
    },
    age: {
        type: Number,
    },
    number: {
        type: Number,
    }
})

// Хешування` паролю перед збереженням
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)
export default User
