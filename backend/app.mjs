import express from 'express'
import connectDB from './db/connectDB.mjs'
import routes from './src/v1/routes/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'
import middleware from './middleware/index.mjs'
const app = express()

//підключення бази даних
connectDB()

app.use('api/v1', routes)

// Використання допоміжних middleware
middleware(app)

//обробка помилок
errorHandler(app)

export default app