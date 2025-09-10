
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
}

export default new CourseDBService(Course)
