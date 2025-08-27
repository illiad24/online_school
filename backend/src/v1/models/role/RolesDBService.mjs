import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Role from './Role.mjs'

class RolesDBService extends MongooseCRUDManager {
    static async getList({ filters }) {
        try {
            const res = await Role.find(filters, { title: 1 })
            return res
        } catch (error) {
            return []
        }
    }
}

export default new RolesDBService(Role)
