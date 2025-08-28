import express from 'express'

import AuthController from '../controllers/authController.mjs'
import { loginValidator } from '../validators/LoginValidator.mjs'
import { signupValidator } from '../validators/signupValidator.mjs'
const router = express.Router()

router.post('/login', loginValidator, AuthController.login)
router.post('/signup', signupValidator, AuthController.signup)
router.post('/refresh', AuthController.refresh)
router.post('/logout', AuthController.logout)
export default router