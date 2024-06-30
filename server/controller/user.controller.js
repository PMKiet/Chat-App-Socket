import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const userDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)

        if (!user) return next(errorHandler(404, 'User not found!'))

        const { password: pass, ...rest } = user._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update user'))
    }
    if (req.body?.username.length < 7 || req.body?.username.length > 20) {
        return next(errorHandler(400, 'Name must be between 7 to 20 characters'))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'Name must be contain characters and numbers'))
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                profilePicture: req.body.profilePicture,
                email: req.body.email,
            }
        }, { new: true })
        const { password, ...rest } = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('accessToken').status(200).json({ message: 'User has been logout' })
    } catch (error) {
        next(error)
    }
}