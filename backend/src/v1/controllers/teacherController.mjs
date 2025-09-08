import { validationResult } from "express-validator"
import TeacherDBService from "../models/teacher/TeacherDBService.mjs"

class TeacherController {
    static async teachersList(req, res) {
        try {
            const dataList = await TeacherDBService.getList()
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async teacherById(req, res) {
        const { id } = req.params
        try {
            const data = await TeacherDBService.getById(id)
            if (!data) {
                return res.status(404).json({ error: 'Teacher not found' })
            }
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async createUpdateTeacher(req, res) {
        try {
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const { id } = req.params
            const teacherData = req.body
            let result
            if (id) {
                result = await TeacherDBService.update(id, teacherData)
            } else {
                result = await TeacherDBService.create(teacherData)
            }
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async deleteById(req, res) {
        try {
            const { id } = req.params
            const result = await TeacherDBService.deleteById(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default TeacherController
