import mongoose from "mongoose";

const { Schema } = mongoose;

const lessonSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be at most 100 characters long'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [10, 'Content must be at least 10 characters long'],
        trim: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [0, 'Duration must be at least 0'],
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Teacher is required'],
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
