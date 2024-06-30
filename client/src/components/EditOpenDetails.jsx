import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase.js'
import { toast } from 'react-toastify'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector, useDispatch } from "react-redux"
import { updateStart, updateSuccess, updateFailure } from '../redux/user.js'

export default function EditOpenDetails({ onClose }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [imageFileIpLoadProgress, setImageFileIpLoadProgress] = useState(null)
    const [imageFileUpLoadError, setImageFileUpLoadError] = useState(null)
    const dispatch = useDispatch()

    const { currentUser } = useSelector((state) => state.User)
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

        try {
            dispatch(updateStart())
            const res = await fetch(`/api/user/updateUser/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(updateSuccess(data))
                onClose()
            }
        } catch (error) {
            toast.warning(error.message)
            dispatch(updateFailure())
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
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
            <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-xm'>Edit user details</p>

                <form >
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="profilePicture">Avatar:

                                <div className="flex flex-col justify-center items-center">
                                    <img
                                        src={imageFileUrl || currentUser?.profilePicture}
                                        alt="avatar"
                                        className={`
                                                rounded-full w-[200px] h-[200px] border-8 object-cover 
                                                ${avatarLoading ? 'opacity-50' : 'opacity-100'}
                                            `} />
                                </div>

                            </label>

                            <input
                                type='file'
                                id='profilePicture'
                                className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                                onChange={(e) => handleChangeImage(e)}
                            />
                        </div>
                        <label htmlFor="username">Name</label>
                        <input
                            type="text"
                            name='username'
                            id='username'
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>
                    <button onClick={(e) => handleSubmit(e)}>Update</button>
                </form>
            </div>
        </div>
    )
}
