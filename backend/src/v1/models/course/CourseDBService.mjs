
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Course from './Course.mjs'


class CourseDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, { password: 0 }, ['lessons', 'users', 'teachers'])
            return res
        } catch (error) {
            return []
        }
    }
}

export default new CourseDBService(Course)
