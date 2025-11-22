import mongoose from "mongoose";
import Enrollment from "../enrollment/Enrollment.mjs";

const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be at most 100 characters long'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [500, 'Description must be at most 500 characters long'],
        trim: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Teacher is required'],
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
    }],
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0'],
    },

    category: {
        // Додати колекцію категорій
    },
    image: {
        type: String,
    }
});

courseSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    try {
        const filter = this.getFilter();
        const id = filter._id;
        await Enrollment.deleteMany({ course: id });
        next();
    } catch (err) {
        next(err);
    }
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
