import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'provide name'],
    },
    email: {
        type: String,
        required: [true, 'provide email']
    },
    password: {
        type: String,
        required: [true, 'provide password']
    },
    profilePicture: {
        type: String,
        default: 'https://s.net.vn/hzHX'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User