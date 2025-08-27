import UsersDBService from '../models/user/UsersDBService.mjs'

class UserController {
    static async usersList(req, res) {
        try {
            const filters = {}
            for (const key in req.query) {
                if (req.query[key]) filters[key] = req.query[key]
            }

            const dataList = await UsersDBService.getList(filters)
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params
            if (id) {
                UsersDBService.getById(id)
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    // static async updateUser(req, res) {
    //     try {

    //         UsersDBService.update(id)

    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            const result = await UsersDBService.delete(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default UserController
