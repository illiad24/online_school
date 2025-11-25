
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

            const enrollments = await EnrollmentUtils.getUserById({ user: userId }, 'find', ['course', 'user'])

            // Популюємо уроки всередині курсу
            if (enrollments && enrollments.course) {
                await enrollments.populate('course.lessons')
            }
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

            const enrollment = await EnrollmentUtils.getUserById({ user: userId, course: courseId }, 'findOne', ['course', 'user'])

            // Популюємо уроки всередині курсу
            if (enrollment && enrollment.course) {
                await enrollment.populate('course.lessons')
            }

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

            // Отримуємо enrollment запис
            const enrollment = await EnrollmentUtils.getUserById(
                { user: userId, course: courseId },
                'findOne'
            );

            if (!enrollment) {
                return res.status(404).json({ message: 'Курс не знайдено для цього користувача' });
            }

            // 1. Перевірити чи урок уже завершено
            if (enrollment.completedLessons.includes(lessonId)) {
                return res.status(400).json({ message: 'Урок вже зараховано пройденим' });
            }

            // 2. Перевірити чи lessonId існує в курсі
            const course = await EnrollmentUtils.getCourseWithLessons(courseId);

            if (!course) {
                return res.status(404).json({ message: 'Курс не знайдено' });
            }
            // console.log(course.lessons);

            const lessonExists = course.lessons.some(
                (lesson) => lesson._id.toString() === lessonId
            );

            if (!lessonExists) {
                return res.status(400).json({ message: 'Урок не належить цьому курсу' });
            }

            // 3. Додаємо урок у completedLessons
            enrollment.completedLessons.push(lessonId);

            // 4. Розрахунок прогресу
            const totalLessons = course.lessons.length;
            const completedCount = enrollment.completedLessons.length;

            const newProgress = Math.round((completedCount / totalLessons) * 100);
            enrollment.progress = newProgress;

            // 5. Автоматичне оновлення статусу
            if (newProgress === 100) {
                enrollment.status = 'completed';
            }

            // 6. Оновлюємо час активності
            enrollment.lastActivityAt = new Date();

            await enrollment.save();

            return res.status(200).json({
                message: 'Урок позначено як завершений',
                progress: enrollment.progress,
                status: enrollment.status,
                completedLessons: enrollment.completedLessons
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error ' + err });
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
