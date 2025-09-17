import express from 'express'
import UserController from '../controllers/userController.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'

const router = express.Router()

router.get('/', requireAuth, requireRoles(['admin']), UserController.usersList)
router.get('/:id', requireAuth, requireRoles(['admin']), UserController.getUserById)

router.put('/:id', requireAuth, requireRoles(['admin']), UserController.updateUser)
router.post('/:id/enroll', requireAuth, requireRoles(['admin', 'manager', 'student']), UserController.enrollUser)

router.delete('/:id', requireAuth, requireRoles(['admin']), UserController.deleteUser)

export default router