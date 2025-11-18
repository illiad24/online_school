import mongoose from "mongoose";

const { Schema } = mongoose;

const enrollmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    completedLessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],

    status: {
        type: String,
        enum: ['active', 'completed', 'canceled'],
        default: 'active'
    },

    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

// Забороняємо дублювання запису одного й того ж курсу для одного користувача
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment