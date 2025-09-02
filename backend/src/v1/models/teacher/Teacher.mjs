import mongoose from "mongoose";
const { Schema } = mongoose;

// Створення схеми вчителя
const teacherSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        trim: true,
    },
    // email: {
    //     type: String,
    //     required: [true, 'Email is required'],
    //     unique: [true, 'Email is already taken'],
    //     minlength: [5, 'Email must be at least 5 characters long'],
    //     maxlength: [100, 'Email must be at most 100 characters long'],
    //     trim: true,
    // },
    // subject: {
    //     type: String,
    //     required: [true, 'Subject is required'],
    //     minlength: [3, 'Subject must be at least 3 characters long'],
    //     maxlength: [50, 'Subject must be at most 50 characters long'],
    //     trim: true,
    // },
    // bio: {
    //     type: String,
    //     maxlength: [500, 'Bio must be at most 500 characters long'],
    //     trim: true,
    // },
    // experience: {
    //     type: Number,
    //     required: [true, 'Experience is required'],
    //     min: [0, 'Experience must be at least 0 years'],
    // },
    // age: {
    //     type: Number,
    //     required: [true, 'Age is required'],
    //     min: [0, 'Age must be at least 0'],
    // },
    // courses: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course',
    // }],
});

// Створення моделі вчителя
const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
