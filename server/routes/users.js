// server/routes/users.js
import express from 'express'
import UsersController from '../controllers/users.js'

const router = express.Router()

router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)
router.get('/profile', UsersController.getUserProfile)
router.patch('/preferences', UsersController.updatePreferences)
router.get('/dates', UsersController.getUserDateIdeas)

export default router