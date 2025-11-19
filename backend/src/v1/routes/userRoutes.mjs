import express from 'express'
import UserController from '../controllers/userController.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'
import upload from '../../../middleware/uploadManager.mjs'

const router = express.Router()

router.get('/', requireAuth, requireRoles(['admin']), UserController.usersList)
router.get('/:id', requireAuth, UserController.getUserById)

router.put('/:id', requireAuth, upload.single('userImage'), UserController.updateUser)
router.put('/:id/role', requireAuth, requireRoles(['admin']), UserController.changeRole)
router.post('/:id/password', requireAuth, UserController.changePassword)

router.delete('/:id', requireAuth, requireRoles(['admin']), UserController.deleteUserByAdmin)
router.delete('/:id/user', requireAuth, UserController.deleteUser)

export default router