import UsersDBService from '../models/user/UsersDBService.mjs'

class UserController {
    static async usersList(req, res) {
        try {
            const filters = {}
            for (const key in req.query) {
                if (req.query[key]) filters[key] = req.query[key]
            }

            const dataList = await UsersDBService.getList(filters)
            console.log(dataList)
            res.json(dataList)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default UserController
