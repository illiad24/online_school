import express from 'express'
import UserController from '../controllers/userController.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'

const router = express.Router()

router.get('/', UserController.usersList)
router.get('/:id', UserController.getUserById)

router.put('/:id', requireAuth, requireRoles(['admin']), UserController.updateUser)

router.delete('/:id', requireAuth, requireRoles(['admin']), UserController.deleteUser)

export default router