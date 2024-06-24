import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../firebase.js'
import { toast } from 'react-toastify'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [imageFileIpLoadProgress, setImageFileIpLoadProgress] = useState(null)
    const [imageFileUpLoadError, setImageFileUpLoadError] = useState(null)
    console.log(formData);
    const handleOnchange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleChangeImage = (e) => {
        const fileImage = e.target.files[0]
        if (fileImage) {
            setImageFile(fileImage)
            setImageFileUrl(URL.createObjectURL(fileImage))
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('formData', formData.username)

        if (!formData.username || !formData.email || !formData.password) {
            return toast.warning('Please fill out all fields')
        }
        try {
            const res = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (res.ok) {
                navigate('/sign_in')
            }
        } catch (error) {
            toast.warning(error.message)
            console.error(error)
        }
    }

    const uploadImage = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storeRef = ref(storage, `image/${fileName}`)
        const uploadTask = uploadBytesResumable(storeRef, imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setAvatarLoading(true)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageFileIpLoadProgress(progress.toFixed(0))
            },
            (error) => {
                console.log(error)
                setImageFileUpLoadError('Could not upload image (File must be less than 2MB')
                setImageFileIpLoadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL })
                    setAvatarLoading(false)
                })
            }
        )
    }
    return (
        <div className='mt-5'>

            <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
                <h3>Welcome to chat app</h3>

                <form className='grid gap-4 mt-5' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="profilePicture">Avatar:
                            {
                                imageFileUrl
                                    ?
                                    <div className="flex flex-col justify-center items-center">
                                        <img
                                            src={imageFileUrl || currentUser.profilePicture}
                                            alt="avatar"
                                            className={`
                                                rounded-full w-[200px] h-[200px] border-8 object-cover 
                                                ${avatarLoading ? 'opacity-50' : 'opacity-100'}
                                            `} />
                                    </div>
                                    :
                                    <div className="h-14 bg-slate-200 flex justify-center items-center border hover:border-primary">
                                        <p>Upload your avatar</p>
                                    </div>
                            }

                        </label>

                        <input
                            type='file'
                            id='profilePicture'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                            onChange={(e) => handleChangeImage(e)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="username">Name:</label>
                        <input
                            type='text'
                            id='username'
                            placeholder='Enter your name'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>
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
                        Sign Up
                    </button>
                    <p>Already have account ? <Link to={'/sign_in'} className='text-secondary hover:text-primary hover:underline font-medium' >Login</Link></p>
                </form>
            </div>
        </div>
    )
}