import UsersDBService from '../models/user/UsersDBService.mjs'
import RolesDBService from '../models/role/RolesDBService.mjs'

class UserController {
    static async usersList(req, res) {
        try {
            const dataList = await UsersDBService.getList()
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params
            if (id) {
                UsersDBService.getById(id)
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async updateUser(req, res) {
        try {
            const { id, role } = req.body;

            if (!id || !role) {
                return res.status(400).json({ error: "Необхідно вказати id і role" });
            }

            const user = await UsersDBService.getById(id);
            if (!user) {
                return res.status(404).json({ error: "Користувача не знайдено" });
            }

            const roles = await RolesDBService.getList();
            const newRole = roles.find(r => r.title === role);

            if (!newRole) {
                return res.status(400).json({ error: "Такої ролі не існує" });
            }
            user.role = newRole._id;
            // Створюємо новий об'єкт користувача з новою роллю

            // Оновлюємо користувача в базі
            await UsersDBService.update(id, user);

            // Відправляємо користувача із новою роллю
            res.json(user);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            const result = await UsersDBService.delete(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default UserController