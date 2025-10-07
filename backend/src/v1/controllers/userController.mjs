import UsersDBService from '../models/user/UsersDBService.mjs'
import RolesDBService from '../models/role/RolesDBService.mjs'
import bcrypt from 'bcryptjs'
import { sendPasswordChangedEmail } from '../utils/mailService.mjs'

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
        const { id } = req.params

        try {
            const data = await UsersDBService.getById(id)
            if (!data) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, age, number } = req.body;
            const file = req.file;

            if (!id) {
                return res.status(400).json({ error: "Необхідно вказати id" });
            }

            const user = await UsersDBService.getById(id);
            if (!user) {
                return res.status(404).json({ error: "Користувача не знайдено" });
            }

            const updatedUser = { ...user.toObject?.(), name, email, age, number };
            if (file) {
                updatedUser.userImage = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            }

            const result = await UsersDBService.update(id, updatedUser);

            res.json(result);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            console.log(id);

            const result = await UsersDBService.deleteById(id)
            // try {
            //     await sendAccountDeletedEmail(user.email, user.name || "Користувач");
            // } catch (mailErr) {
            //     console.error("Помилка надсилання email про видалення акаунту:", mailErr);
            // }
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async deleteUserByAdmin(req, res) {
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


    static async changePassword(req, res) {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: "Обидва паролі обов’язкові" });
            }

            const user = await UsersDBService.getByIdFull(id);
            if (!user) return res.status(404).json({ message: 'Користувач не знайдений' });

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Старий пароль некоректний' });
            user.password = newPassword;
            await user.save();

            // try {
            //     await sendPasswordChangedEmail(user.email, user.name || "Користувач");
            // } catch (mailErr) {
            //     console.error("Помилка надсилання email про зміну паролю:", mailErr);
            // }

            return res.json({ message: 'Пароль успішно змінено' });
        } catch (err) {
            console.error("Error in changePassword:", err);
            return res.status(500).json({ message: 'Сталася помилка на сервері' });
        }
    }


}

export default UserController