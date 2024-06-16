import express from 'express'
import { updateUser, userDetail } from '../controller/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/userDetail/:userId', verifyUser, userDetail)
router.post('/updateUser/:userId', verifyUser, updateUser)


export default router