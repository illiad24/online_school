
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Course from './Course.mjs'
import EnrollmentUtils from '../enrollment/EnrollmentUtils.mjs'


class CourseDBService extends MongooseCRUDManager {
    async getList() {
        try {
            const res = await super.getList({}, null, ['teacher', 'lessons'])
            return res
        } catch (error) {
            return []
        }
    }
    async getById(id) {
        try {
            const res = await super.getById(id, ['teacher', 'lessons'])
            return res

        } catch (error) {
            throw new Error('Error finding data by id: ' + error.message)
        }
    }
    async addLessonToCourse(courseId, lessonId) {
        try {
            const course = await this.model.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            if (!course.lessons.includes(lessonId)) {
                course.lessons.push(lessonId);
            } else {
                throw new Error('Lesson already exist');
            }
            await course.save();

            // Оновлюємо прогрес для всіх enrollment записів цього курсу
            try {
                await EnrollmentUtils.updateProgressForAllEnrollments(courseId);
            } catch (progressError) {
                console.error('Error updating progress after adding lesson:', progressError);
                // Не кидаємо помилку, щоб не блокувати додавання уроку
            }

            return course;
        } catch (error) {
            throw new Error('Error adding lesson to course');
        }

    }

    async removeLessonFromCourse(courseId, lessonId) {
        try {
            const course = await this.model.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            course.lessons = course.lessons.filter(id => id.toString() !== lessonId.toString());
            await course.save();

            // Оновлюємо прогрес для всіх enrollment записів цього курсу
            // (видаляємо видалений урок з completedLessons та перераховуємо прогрес)
            try {
                await EnrollmentUtils.updateProgressForAllEnrollments(courseId);
            } catch (progressError) {
                console.error('Error updating progress after removing lesson:', progressError);
                // Не кидаємо помилку, щоб не блокувати видалення уроку
            }

            return course;
        } catch (error) {
            throw new Error('Error removing lesson from course: ' + error.message);
        }
    }

    async updateLessonsOrder(courseId, lessonsOrder) {
        try {
            const course = await this.model.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            course.lessons = lessonsOrder;
            await course.save();

            // Оновлюємо прогрес для всіх enrollment записів цього курсу
            // (на випадок, якщо порядок змінився, але кількість залишилася такою ж)
            try {
                await EnrollmentUtils.updateProgressForAllEnrollments(courseId);
            } catch (progressError) {
                console.error('Error updating progress after updating lessons order:', progressError);
                // Не кидаємо помилку, щоб не блокувати оновлення порядку
            }

            return course;
        } catch (error) {
            throw new Error('Error updating lessons order: ' + error.message);
        }
    }

}



export default new CourseDBService(Course)
