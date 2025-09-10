import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Lesson from './Lesson.mjs'

class LessonsDBService extends MongooseCRUDManager {
    async getList() {
        try {
            const res = await super.getList()
            return res
        } catch (error) {
            return []
        }
    }
}

export default new LessonsDBService(Lesson)
