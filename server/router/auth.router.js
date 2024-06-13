import express from 'express'
import { registerUser } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signUp', registerUser)

export default router