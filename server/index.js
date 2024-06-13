import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './router/auth.router.js'
import bodyParser from 'body-parser'

dotenv.config()

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('MongoDB connected')
    }).catch((err) => {
        console.log('Connect to DB failure with err:', err)
    })


const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api/auth/', userRouter)

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running on Port ' + PORT
    })
})

app.listen(PORT, () => {
    console.log('Server is running on Port ' + PORT)
})