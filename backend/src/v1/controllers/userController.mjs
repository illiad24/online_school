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
            const result = await UsersDBService.deleteById(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async enrollUser(req, res) {
        try {
            const { id } = req.params;
            const { courseId } = req.body;

            const user = await UsersDBService.getById(id);

            if (!user) {
                return res.status(404).json({ message: "Користувача не знайдено" });
            }

            if (user.courses.includes(courseId)) {
                return res.status(400).json({ message: "Курс вже доданий для цього користувача" });
            }

            user.courses.push(courseId);
            await user.save();

            res.json({ message: "Курс успішно додано", user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

export default UserController