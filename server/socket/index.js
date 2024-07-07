import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

export const app = express()

// socket connection
export const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('Connect user: ', socket.id)

    // Disconnect
    io.on('disconnect', () => {
        console.log('Disconnect user:', socket.id)
    })
})
