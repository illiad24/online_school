import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import loggerConfig from '../config/logger.mjs'
import cors from 'cors'

// Визначення поточного файлу і директорії
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middleware = (app) => {
    // Middleware для підтримки CORS (Cross-Origin Resource Sharing)
    app.use(cors({
        origin: 'http://localhost:5173', // 👈 твій фронт
        credentials: true,               // 👈 дозволяє кукі
    }));


    // Middleware для логування запитів
    app.use(loggerConfig)

    // Middleware для парсингу JSON запитів
    app.use(express.json())

    // Middleware для парсингу URL-кодованих даних
    app.use(express.urlencoded({ extended: false }))

    // Middleware для парсингу cookies
    app.use(cookieParser())

    // Middleware для обробки статичних файлів з директорії public
    app.use(express.static(path.join(__dirname, '../public')))

    // Middleware для обробки статичних файлів з директорії uploads
    app.use(express.static(path.join(__dirname, '../uploads')))

}

export default middleware
