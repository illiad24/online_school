import mongoose from "mongoose";

const { Schema } = mongoose;

const lessonSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Назва уроку є обов\'язковою'],
        minlength: [3, 'Назва повинна містити щонайменше 3 символи'],
        maxlength: [100, 'Назва не може перевищувати 100 символів'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Зміст уроку є обов\'язковим'],
        minlength: [10, 'Зміст повинен містити щонайменше 10 символів'],
        trim: true,
    },
    // course: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course',
    //     required: [true, 'Курс, до якого належить урок, є обов\'язковим'],
    // },
    duration: {
        type: Number,
        required: [true, 'Тривалість уроку є обов\'язковою'],
        min: [0, 'Тривалість не може бути від\'ємною'],
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Вчитель, що проводить урок, є обов\'язковим'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;