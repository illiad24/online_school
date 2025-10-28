import express from 'express'
import TeacherController from '../controllers/teacherController.mjs'
import { teacherValidator } from '../validators/TeacherValidator.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'
import upload from '../../../middleware/uploadManager.mjs'

const router = express.Router()

router.get('/', TeacherController.teachersList)
router.get('/:id', TeacherController.teacherById)

router.post('/create', requireAuth, upload.single('image'), requireRoles(['admin', 'manager']), teacherValidator, TeacherController.createUpdateTeacher)
router.put('/:id', requireAuth, upload.single('image'), requireRoles(['admin', 'manager']), teacherValidator, TeacherController.createUpdateTeacher)

router.delete('/:id', requireAuth, requireRoles(['admin']), TeacherController.deleteById)

export default router