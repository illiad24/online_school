import CourseDBService from "../models/course/CourseDBService.mjs"


class CourseController {
    static async coursesList(req, res) {
        try {
            const dataList = await CourseDBService.getList()
            console.log(dataList)
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
            const { id } = req.params
            console.log(id)
            const courseData = req.body
            console.log(courseData)
            let result
            if (id) {
                result = await CourseDBService.update(id, courseData)
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
