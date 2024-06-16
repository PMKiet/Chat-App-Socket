import jwt from 'jsonwebtoken'
import { errorHandler } from './errorHandler.js'

export const verifyUser = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return next(errorHandler(401, 'Unauthorized!'))
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
            return next(errorHandler(401, 'Unauthorized'))
        }
        req.user = user
        next()
    })

}