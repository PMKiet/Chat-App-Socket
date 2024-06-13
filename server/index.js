import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('MongoDB connected')
    }).catch((err) => {
        console.log('Connect to DB failure with err:', err)
    })


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credentials: true
}))

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running on Port' + PORT
    })
})

app.listen(PORT, () => {
    console.log('Server is running on Port' + PORT)
})