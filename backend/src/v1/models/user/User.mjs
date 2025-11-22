import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcryptjs'
import Enrollment from '../enrollment/Enrollment.mjs'

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
userSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    try {
        const filter = this.getFilter(); 
        const id = filter._id;
        await Enrollment.deleteMany({ course: id });
        next();
    } catch (err) {
        next(err);
    }
});
const User = mongoose.model('User', userSchema)
export default User
