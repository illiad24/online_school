
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Enrollment from './Enrollment.mjs'
import EnrollmentUtils from './EnrollmentUtils.mjs'

class EnrollmentsDBService extends MongooseCRUDManager {

    async addEnrollment(req, res) {
        try {
            const { userId, courseId } = req.body

            const existing = await EnrollmentUtils.getUserById({ user: userId, course: courseId }, 'findOne')

            if (existing) return res.status(400).json({ message: 'Користувач вже записаний на цей курс' })

            const enrollment = await EnrollmentUtils.createEnroll({ user: userId, course: courseId })

            res.json(enrollment)
        } catch (err) {
            res.status(500).json({ message: 'Server error ' + err })
        }
    }

    // Всі курси користувача 
    async getAllUserCourses(req, res) {
        try {
            const { userId } = req.params

            if (!userId) {
                return res.status(400).json({ message: 'Не вказано userId' })
            }

            const enrollments = await EnrollmentUtils.getUserById({ user: userId })
            return res.json(enrollments)
        } catch (err) {
            console.error('Error in getUserInfo:', err)
            res.status(500).json({ message: 'Server error ' + err })
        }
    }
    // Конткретний курс 
    async getUserCourse(req, res) {
        try {
            const { userId, courseId } = req.params

            if (!userId) {
                return res.status(400).json({ message: 'Не вказано userId' })
            }
            if (!courseId) {
                return res.status(400).json({ message: 'Не вказано courseId' })
            }

            const enrollment = await EnrollmentUtils.getUserById({ user: userId, course: courseId }, 'findOne')
            return res.json(enrollment)
        } catch (err) {
            console.error('Error in getUserInfo:', err)
            res.status(500).json({ message: 'Server error ' + err })
        }
    }

    // Позначити пройдений урок
    async completeLesson(req, res) {
        try {
            const { userId, courseId, lessonId } = req.body;

            if (!userId || !courseId || !lessonId) {
                return res.status(400).json({ message: 'Не всі параметри передані' });
            }
            const course = await EnrollmentUtils.getUserById({ user: userId, course: courseId }, 'findOne')

            console.log(course);

            if (!course) {
                return res.status(400).json({ message: 'Дані про курс не знайдено ' })
            }

            if (!course.completedLessons.includes(lessonId)) {
                course.completedLessons.push(lessonId)
            } else {
                return res.status(400).json({ message: 'Урок вже зараховано пройденим ' })
            }
            console.log(course);
            await course.save();
            return res.status(200).json({
                message: 'Урок позначено як завершений',
                completedLessons: course.completedLessons
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error ' + err })
        }
    }

    async updateStatus(req, res) {
        try {
            const { userId, courseId } = req.params;
            const { status } = req.body;

            if (!userId || !courseId) {
                return res.status(400).json({ message: 'Не вказано userId або courseId' });
            }

            if (!status) {
                return res.status(400).json({ message: 'Не вказано статус' });
            }

            const allowed = ['active', 'completed', 'canceled'];
            if (!allowed.includes(status)) {
                return res.status(400).json({ message: 'Недійсний статус' });
            }

            const enrollment = await EnrollmentUtils.getUserById(
                { user: userId, course: courseId },
                'findOne'
            );

            if (!enrollment) {
                return res.status(404).json({ message: 'Курс не знайдено для цього користувача' });
            }

            enrollment.status = status;
            await enrollment.save();

            return res.json({
                message: 'Статус успішно оновлено',
                enrollment
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error ' + err });
        }
    }




}

export default new EnrollmentsDBService(Enrollment)
