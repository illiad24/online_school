import express from 'express'
import CourseController from '../controllers/courseController.mjs'


const router = express.Router()

router.get('/', CourseController.coursesList)
router.get('/:id', CourseController.coursesById)

router.post('/create', CourseController.createUpdateCourse)
router.put('/', CourseController.createUpdateCourse)

router.delete('/:id', CourseController.deleteById)

export default router