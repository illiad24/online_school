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
                console.log(errors)
                return res.status(400).json({ error: errors.array() });
            }
            const { id } = req.params
            const courseData = req.body
            let result
            if (id) {
                console.log(id)
                console.log(courseData)
                console.log(courseData.data)
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
}

export default CourseController
