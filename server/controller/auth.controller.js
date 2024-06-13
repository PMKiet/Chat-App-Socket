import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/errorHandler.js'

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        console.log('username', username)
        console.log('email', email)

        //check fields input
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'All fields is required'))
        }

        //check Username exits
        const checkUsername = await User.findOne({ username })
        if (checkUsername) {
            next(errorHandler(404, 'Already name exits'))
        }

        //check email exits
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            next(errorHandler(404, 'Already email exits'))
        }

        //hash password
        const hashPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        await newUser.save()
        res.status(201).json({
            message: 'Register success',
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}