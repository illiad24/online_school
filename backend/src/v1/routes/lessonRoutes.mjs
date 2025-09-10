import express from 'express'
import LessonsController from '../controllers/lessonController.mjs'
const router = express.Router()

router.get('/', LessonsController.lessonsList)
router.get('/:id', LessonsController.lessonsById)

router.post('/create', LessonsController.createUpdateLesson)
router.put('/:id', LessonsController.createUpdateLesson)

router.delete('/:id', LessonsController.deleteById)

export default router