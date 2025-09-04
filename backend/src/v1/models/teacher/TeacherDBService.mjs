
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Teacher from './Teacher.mjs'

class TeacherDBService extends MongooseCRUDManager {
    async getList() {
        try {
            const res = await super.getList()
            return res
        } catch (error) {
            return []
        }
    }
}

export default new TeacherDBService(Teacher)
