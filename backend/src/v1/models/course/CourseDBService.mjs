
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Course from './Course.mjs'


class CourseDBService extends MongooseCRUDManager {
    async getList() {
        try {
            const res = await super.getList({}, null, ['teacher', 'lessons'])
            return res
        } catch (error) {
            return []
        }
    }
    async addLessonToCourse(courseId, lessonId) {
        try {
            const course = await this.model.findById(courseId);
            console.log(course)
            if (!course) {
                throw new Error('Course not found');
            }
            course.lessons.push(lessonId);
            console.log(course)
            await course.save();
            return course;
        } catch (error) {
            throw new Error('Error adding lesson to course');
        }

    }
}

export default new CourseDBService(Course)
