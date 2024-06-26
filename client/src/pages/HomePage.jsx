import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBar from '../components/SideBar'

export default function HomePage() {
    const { currentUser } = useSelector((state) => state.User)
    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) {
            navigate('/sign_in')
        }
    }, [])
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className='bg-white'>
                <SideBar />
            </section>

            <section>
                <Outlet />
            </section>
        </div>
    )
}
