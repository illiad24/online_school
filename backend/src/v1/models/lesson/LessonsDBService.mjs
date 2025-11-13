import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Lesson from './Lesson.mjs'

class LessonsDBService extends MongooseCRUDManager {
    async getList() {
        try {
            const res = await super.getList({}, null, ['teacher'])

            return res
        } catch (error) {
            return []
        }
    }
    async getById(id) {
        try {
            const res = await super.getById(id, ['teacher'])
            return res

        } catch (error) {
            throw new Error('Error finding data by id: ' + error.message)
        }
    }
}

export default new LessonsDBService(Lesson)
