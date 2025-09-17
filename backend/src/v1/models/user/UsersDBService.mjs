import User from './User.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class UsersDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            const res = await super.getList(filters, { password: 0 }, ['role', 'courses'])
            return res
        } catch (error) {
            return []
        }
    }
    async enrollUser(userId, courseId) {
        try {
            const currentUser = await this.model.findById(userId);
            if (!currentUser) {
                throw new Error('User not found');
            }
            currentUser.courses.push(courseId);
            await currentUser.save();
            return currentUser;
        } catch (error) {
            throw new Error('Error adding course to user');
        }
    }
}

export default new UsersDBService(User)
