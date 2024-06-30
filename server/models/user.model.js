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
        default: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User