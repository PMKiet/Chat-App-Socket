import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        console.log('username', username)
        console.log('email', email)

        //check fields input
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return next(errorHandler(400, 'All fields is required'))
        }

        //check Username exits
        const checkUsername = await User.findOne({ username })
        if (checkUsername) {
            return next(errorHandler(404, 'Already name exits'))
        }

        //check email exits
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return next(errorHandler(404, 'Already email exits'))
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

export const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === '', password === '') {
        return next(errorHandler(400, 'All fields is required'))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password!'))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY)
        const { password: pass, ...rest } = validUser._doc
        res.status(200).cookie('accessToken', token).json(rest)

    } catch (error) {
        next(error)
    }
}