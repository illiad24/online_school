import { validationResult } from "express-validator"
import CourseDBService from "../models/course/CourseDBService.mjs"


class CourseController {
    static async coursesList(req, res) {
        try {
            const dataList = await CourseDBService.getList()
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async coursesById(req, res) {
        const { id } = req.params
        try {
            const data = await CourseDBService.getById(id)
            if (!data) {
                return res.status(404).json({ error: 'Course not found' })
            }
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async createUpdateCourse(req, res) {
        try {
            const errors = validationResult(req.body);

            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const { id } = req.params
            const courseData = req.body
            let result
            if (id) {
                result = await CourseDBService.update(id, courseData.data)
            } else {
                result = await CourseDBService.create(courseData)
            }
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async deleteById(req, res) {
        try {
            const { id } = req.params
            const result = await CourseDBService.deleteById(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async addLessonToCourse(req, res) {
        try {
            const { id } = req.params
            const { lessonId } = req.body
            const result = await CourseDBService.addLessonToCourse(id, lessonId)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async addUserToCourse(req, res) {
        try {
            const { id } = req.params;        // courseId
            const { userId } = req.body;

            const course = await CourseDBService.getById(id);

            if (!course) {
                return res.status(404).json({ message: "Курс не знайдено" });
            }

            if (course.users.includes(userId)) {
                return res.status(400).json({ message: "Користувач вже є у цьому курсі" });
            }

            course.users.push(userId);
            await course.save();

            res.json({ message: "Користувача успішно додано до курсу", course });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default CourseController
