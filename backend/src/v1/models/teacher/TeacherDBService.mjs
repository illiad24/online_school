
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Teacher from './Teacher.mjs'

class TeacherDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, { password: 0 }, ['courses'])
            return res
        } catch (error) {
            return []
        }
    }
}

export default new TeacherDBService(Teacher)
