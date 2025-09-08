import express from 'express'
import CourseController from '../controllers/courseController.mjs'
import { courseValidator } from '../validators/CourseValidator.mjs'

const router = express.Router()

router.get('/', CourseController.coursesList)
router.get('/:id', CourseController.coursesById)

router.post('/create', courseValidator, CourseController.createUpdateCourse)
router.put('/:id', courseValidator, CourseController.createUpdateCourse)

router.delete('/:id', CourseController.deleteById)

export default router