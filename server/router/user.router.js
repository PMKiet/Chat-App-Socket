import express from 'express'
import { logoutUser, updateUser, userDetail } from '../controller/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/userDetail/:userId', verifyUser, userDetail)
router.put('/updateUser/:userId', verifyUser, updateUser)
router.post('/logout', logoutUser)


export default router