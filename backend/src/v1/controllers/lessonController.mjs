import { validationResult } from "express-validator"
import LessonsDBService from "../models/lesson/LessonsDBService.mjs"


class LessonsController {
    static async lessonsList(req, res) {
        try {
            const dataList = await LessonsDBService.getList()
            console.log(dataList)
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async lessonsById(req, res) {
        const { id } = req.params
        try {
            const data = await LessonsDBService.getById(id)
            if (!data) {
                return res.status(404).json({ error: 'Lesson not found' })
            }
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async createUpdateLesson(req, res) {
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
                result = await LessonsDBService.update(id, courseData.data)
            } else {
                result = await LessonsDBService.create(courseData)
            }
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async deleteById(req, res) {
        try {
            const { id } = req.params
            const result = await LessonsDBService.deleteById(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default LessonsController
