import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user'

export default function SignInPage() {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleOnchange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return toast.warning('Please fill out all fields')
        }
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                return dispatch(signInFailure(data.message))
            }
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/home')
            }
            toast.error(data.message)
        } catch (error) {
            dispatch(signInFailure(error))
            console.log(error.message)
        }
    }

    return (
        <div className='mt-5'>

            <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
                <h3>Welcome to chat app</h3>

                <form className='grid gap-4 mt-5' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>

                    <button className='bg-primary text-white text-lg py-1 hover:bg-secondary rounded mt-3 tracking-wide'>
                        Sign In
                    </button>
                    <p>You don't have an account ? <Link to={'/sign_up'} className='text-secondary hover:text-primary hover:underline font-medium'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}
