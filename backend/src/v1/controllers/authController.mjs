import jwt from 'jsonwebtoken'
import UsersDBService from '../models/user/UsersDBService.mjs'
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwtHelpers.mjs'
import bcrypt from 'bcryptjs'
import RolesDBService from '../models/role/RolesDBService.mjs';
import { validationResult } from "express-validator";
class AuthController {
    static async login(req, res) {
        // 1. Отримуємо email і password з тіла запиту
        const { email, password } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        // 2. Зчитуємо всіх користувачів з файлу
        const users = await UsersDBService.getList()

        // 3. Шукаємо користувача з таким email
        const user = users.find((u) => u.email == email)
        if (!user) {
            return res.status(401).json({ error: 'Не коректні дані' })
        }
        const userWithPassword = await UsersDBService.getById(user?._id)

        const match = await bcrypt.compare(password, userWithPassword?.password)
        // 4. Якщо користувача не знайдено або пароль не співпадає — помилка
        if (!match) {
            return res.status(401).json({ error: 'Не коректні дані' })
        }

        // 5. Генеруємо accessToken і refreshToken
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        // 6. Відправляємо refreshToken у httpOnly cookie, а accessToken і дані користувача — у відповідь
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // у проді — true
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .json({
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                accessToken,
            })
    }

    static async signup(req, res) {
        const { name, email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const users = await UsersDBService.getList()
            const existingUser = users.find(u => u.email === email)
            if (existingUser) return res.status(409).json({ error: 'User already exists' })

            const roles = await RolesDBService.getList()
            let userRole
            if (name == 'bvt') {
                userRole = roles.find(r => r.title === 'admin')
            } else {
                userRole = roles.find(r => r.title === 'guest')
            }


            const newUser = {
                email,
                password,
                role: userRole._id,
                name
            }

            const createdUser = await UsersDBService.create(newUser)
            const accessToken = generateAccessToken(createdUser)
            const refreshToken = generateRefreshToken(createdUser)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).status(201).json({
                user: { id: createdUser._id, email: createdUser.email, role: createdUser.role },
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
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
            const user = users.find(u => u._id.toString() === payload.id);

            if (!user) return res.sendStatus(401)
            // 5. Генеруємо новий accessToken
            const accessToken = generateAccessToken(user)
            // 6. Відправляємо новий accessToken і дані користувача у відповідь
            res.json({
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                accessToken,
            })
        } catch {
            // Якщо refreshToken невалідний або прострочений
            return res.sendStatus(403)
        }
    }
    static async logout(req, res) {
        res.clearCookie('refreshToken')
        res.sendStatus(204)
    }

}
export default AuthController