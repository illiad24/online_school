import express from 'express'
import TeacherController from '../controllers/teacherController.mjs'
import { teacherValidator } from '../validators/TeacherValidator.mjs'

const router = express.Router()

router.get('/', TeacherController.teachersList)
router.get('/:id', TeacherController.teacherById)

router.post('/create', teacherValidator, TeacherController.createUpdateTeacher)
router.put('/:id', teacherValidator, TeacherController.createUpdateTeacher)

router.delete('/:id', TeacherController.deleteById)

export default router