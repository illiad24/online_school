import express from 'express'
import TeacherController from '../controllers/teacherController.mjs'


const router = express.Router()

router.get('/', TeacherController.teachersList)
router.get('/:id', TeacherController.teacherById)

router.post('/create', TeacherController.createUpdateTeacher)
router.put('/:id', TeacherController.createUpdateTeacher)

router.delete('/:id', TeacherController.deleteById)

export default router