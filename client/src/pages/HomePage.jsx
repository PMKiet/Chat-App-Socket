import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBar from '../components/SideBar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'

export default function HomePage() {
    const { currentUser } = useSelector((state) => state.User)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!currentUser) {
            navigate('/sign_in')
        }
    }, [])

    /* socket connection */
    useEffect(() => {
        const socketConnection = io('http://localhost:3000/')

        return () => {
            socketConnection.disconnect()
        }
    }, [])

    const basePath = location.pathname === '/'
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
                <SideBar />
            </section>

            <section className={`${basePath && 'hidden'}`}>
                <Outlet />
            </section>

            <div className={` justify-center items-center flex-col ${!basePath ? 'hidden' : 'lg:flex'} `}>
                <div>
                    <img
                        src={logo}
                        alt='logo'
                        width={200}
                    />
                    <p>Select user to send message</p>
                </div>
            </div>
        </div>
    )
}
