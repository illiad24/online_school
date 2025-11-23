import Course from '../course/Course.mjs'
import Enrollment from './Enrollment.mjs'
class EnrollmentUtils {

    static async getUserById(filters, type = 'find', populateFields = []) {
        try {
            let query
            if (type == 'findOne') {
                query = Enrollment.findOne(filters)
            } else {
                query = Enrollment.find(filters)
            }
            populateFields.forEach((field) => {
                if (typeof field === 'string') {
                    // Якщо поле передано як рядок
                    query = query.populate(field)
                } else if (
                    typeof field === 'object' &&
                    field.fieldForPopulation &&
                    field.requiredFieldsFromTargetObject
                ) {
                    // Якщо передано об'єкт з полем для заповнення та запитуваними полями
                    query = query.populate(
                        field.fieldForPopulation,
                        field.requiredFieldsFromTargetObject
                    )
                }
            })
            return await query.exec()
        } catch (err) {
            console.error('Error in getUserCourse:', err);
            return []
        }
    }

    static async createEnroll(data) {
        try {
            const newItem = new Enrollment(data)
            return await newItem.save()
        } catch (error) {
            throw new Error('Error creating data: ' + error.message)
        }
    }

    static async getCourseWithLessons(courseId) {
        return Course.findById(courseId).populate('lessons').exec();
    }

    // Оновлює прогрес для всіх enrollment записів конкретного курсу
    static async updateProgressForAllEnrollments(courseId) {
        try {
            const course = await Course.findById(courseId).populate('lessons').exec();
            if (!course) {
                throw new Error('Course not found');
            }

            const totalLessons = course.lessons.length;
            const courseLessonIds = course.lessons.map(lesson => lesson._id.toString());

            // Знаходимо всі enrollment для цього курсу
            const enrollments = await Enrollment.find({ course: courseId });

            // Оновлюємо прогрес для кожного enrollment
            for (const enrollment of enrollments) {
                // Видаляємо з completedLessons ті уроки, які більше не існують в курсі
                enrollment.completedLessons = enrollment.completedLessons.filter(lessonId => {
                    const lessonIdStr = lessonId.toString();
                    return courseLessonIds.includes(lessonIdStr);
                });

                // Перераховуємо прогрес
                const completedCount = enrollment.completedLessons.length;
                const newProgress = totalLessons > 0 
                    ? Math.round((completedCount / totalLessons) * 100) 
                    : 0;

                enrollment.progress = newProgress;

                // Оновлюємо статус
                if (newProgress === 100 && enrollment.status !== 'completed') {
                    enrollment.status = 'completed';
                } else if (newProgress < 100 && enrollment.status === 'completed') {
                    enrollment.status = 'active';
                }

                await enrollment.save();
            }

            return enrollments;
        } catch (error) {
            console.error('Error updating progress for enrollments:', error);
            throw new Error('Error updating progress for enrollments: ' + error.message);
        }
    }


}

export default EnrollmentUtils