import express from 'express'
import UserController from '../controllers/userController.mjs'

const router = express.Router()

router.get('/', UserController.usersList)



export default router