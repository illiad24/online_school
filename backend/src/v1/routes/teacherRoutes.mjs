import express from 'express'
import TeacherController from '../controllers/teacherController.mjs'
import { teacherValidator } from '../validators/TeacherValidator.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'

const router = express.Router()

router.get('/', TeacherController.teachersList)
router.get('/:id', TeacherController.teacherById)

router.post('/create', requireAuth, requireRoles(['admin', 'manager']), teacherValidator, TeacherController.createUpdateTeacher)
router.put('/:id', requireAuth, requireRoles(['admin', 'manager']), teacherValidator, TeacherController.createUpdateTeacher)

router.delete('/:id', requireAuth, requireRoles(['admin']), TeacherController.deleteById)

export default router