import express from 'express'
import UserController from '../controllers/userController.mjs'

const router = express.Router()

router.get('/', UserController.usersList)
router.get('/:id', UserController.getUserById)

// Зміна юзера його ролі, може змінювати тільки адмін
// router.put('/', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)

export default router