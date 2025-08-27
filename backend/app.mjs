import express from 'express'
import connectDB from './db/connectDB.mjs'
import routes from './src/v1/routes/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'
import middleware from './middleware/index.mjs'
import cookieParser from 'cookie-parser';
const app = express()

//підключення бази даних
connectDB()


// Використання допоміжних middleware
middleware(app)

// app.use('/api/v1', routes)
app.use('/', routes)


//обробка помилок
errorHandler(app)

export default app