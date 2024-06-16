import express from 'express'
import { login, registerUser } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signUp', registerUser)
router.post('/signIn', login)

export default router