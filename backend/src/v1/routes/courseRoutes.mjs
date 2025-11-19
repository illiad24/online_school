import express from 'express'
import CourseController from '../controllers/courseController.mjs'
import { courseValidator } from '../validators/CourseValidator.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'
import upload from '../../../middleware/uploadManager.mjs'
const router = express.Router()

router.get('/', CourseController.coursesList)
router.get('/:id', CourseController.coursesById)

router.post('/create', requireAuth, upload.single('image'), requireRoles(['admin', 'manager']), courseValidator, CourseController.createUpdateCourse)
router.post('/:id/add-lesson', requireAuth, requireRoles(['admin', 'manager']), CourseController.addLessonToCourse)
router.delete('/:id', requireAuth, requireRoles(['admin']), CourseController.deleteById)

router.put('/:id', requireAuth, upload.single('image'), requireRoles(['admin', 'manager']), courseValidator, CourseController.createUpdateCourse)
export default router