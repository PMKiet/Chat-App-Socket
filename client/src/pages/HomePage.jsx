import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBar from '../components/SideBar'
import logo from '../assets/logo.png'

export default function HomePage() {
    const { currentUser } = useSelector((state) => state.User)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!currentUser) {
            navigate('/sign_in')
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

            <div className='lg:flex justify-center items-center flex-col hidden'>
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
