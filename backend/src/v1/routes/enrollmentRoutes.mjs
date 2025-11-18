import express from 'express'
import EnrollmentsDBService from '../models/enrollment/EnrollmentsDBService.mjs'
import EnrollmentUtils from '../models/enrollment/EnrollmentUtils.mjs'

const router = express.Router()


router.post('/', EnrollmentsDBService.addEnrollment)               // запис на курс
router.get('/user/:userId', EnrollmentsDBService.getAllUserCourses)    // всі курси користувача 
router.get('/user/:userId/course/:courseId', EnrollmentsDBService.getUserCourse) // конкретний курс
router.post('/complete-lesson', EnrollmentsDBService.completeLesson) // позначити урок пройденим
router.patch('/:userId/:courseId/status', EnrollmentsDBService.updateStatus) // оновити статус курсу



export default router