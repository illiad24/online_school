import User from './User.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class UsersDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, { password: 0 }, ['role'])
            return res
        } catch (error) {
            return []
        }
    }
    async getById(id) {
        try {
            const res = await super.getById(id, [], { password: 0, role: 0 },)
            return res
        } catch (error) {
            return []
        }
    }
    async getByIdSimple(id) {
        try {
            const res = await super.getById(id, [], { password: 0, })
            return res
        } catch (error) {
            return []
        }
    }
    async getByIdFull(id) {
        try {
            const res = await super.getById(id, ['role'])
            return res
        } catch (error) {
            return []
        }
    }

}

export default new UsersDBService(User)
