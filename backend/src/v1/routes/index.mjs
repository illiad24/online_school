import express from 'express'

import authRoutes from './authRoutes.mjs'
import userRoutes from './userRoutes.mjs'
import teacherRoutes from './teacherRoutes.mjs'
import courseRoutes from './courseRoutes.mjs'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the API')
})
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/teachers', teacherRoutes)
router.use('/courses', courseRoutes)

export default router