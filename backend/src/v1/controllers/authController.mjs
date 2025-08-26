import jwt from 'jsonwebtoken'
import UsersDBService from '../models/user/UsersDBService.mjs'
import { prepareToken } from '../../../utils/jwtHelpers.mjs'
class AuthController {
    static async login(req, res) {
        if (!req.body.email) {
            return res.status(401).json({ error: 'Email is required' })
        }
        if (!req.body.password) {
            return res.status(401).json({ error: 'Password is required' })
        }
        try {
            const user = await UsersDBService.findOne({
                email: req.body.email,
            })
            if (!user) {
                return res.status(401).json({ error: 'User not found' })
            }
            if (!user.validPassword(req.body.password)) {
                return res.status(401).json({ error: 'Login error' })
            }
            const token = prepareToken(
                {
                    id: user._id,
                    username: user.username,
                },
                req.headers
            )
            res.json({
                result: 'Authorized',
                token,
            })
        } catch (err) {
            res.status(401).json({ error: 'Login error' })
        }
    }
    static async signup(req, res) {
        res.json({ message: 'signup - to be implemented' })
    }
    static async refresh(req, res) {
        const token = req.cookies.refreshToken
        if (!token) return res.sendStatus(401)
        try {
            // 2. Перевіряємо refreshToken
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            // 3. Зчитуємо всіх користувачів з файлу
            const users = await UsersDBService.getList()
            // 4. Шукаємо користувача за id з токена
            const user = users.find((u) => u.id == payload.id)
            if (!user) return res.sendStatus(401)
            // 5. Генеруємо новий accessToken
            const accessToken = generateAccessToken(user)
            // 6. Відправляємо новий accessToken і дані користувача у відповідь
            res.json({
                user: { id: user.id, email: user.email, role: user.role },
                accessToken,
            })
        } catch {
            // Якщо refreshToken невалідний або прострочений
            return res.sendStatus(403)
        }
    }

}
export default AuthController