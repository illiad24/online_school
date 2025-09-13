import express from 'express'
import LessonsController from '../controllers/lessonController.mjs'
import { requireAuth, requireRoles } from '../../../middleware/requireRole.mjs'
const router = express.Router()

router.get('/', requireAuth, requireRoles(['admin', 'manager']), LessonsController.lessonsList)
router.get('/:id', LessonsController.lessonsById)

router.post('/create', requireAuth, requireRoles(['admin', 'manager']), LessonsController.createUpdateLesson)
router.put('/:id', requireAuth, requireRoles(['admin', 'manager']), LessonsController.createUpdateLesson)

router.delete('/:id', requireAuth, requireRoles(['admin']), LessonsController.deleteById)

export default router