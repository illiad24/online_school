import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Lesson from './Lesson.mjs'

class LessonsDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, { password: 0 }, ['teachers', 'courses'])
            return res
        } catch (error) {
            return []
        }
    }
}

export default new LessonsDBService(Lesson)
