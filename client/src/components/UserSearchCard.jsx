import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom';

export default function UserSearchCard({ user, onClose }) {
    console.log(user.profilePicture);
    return (
        <Link to={`/${user._id}`} onClick={onClose} className='flex items-center gap-3 p-2 border border-s-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
            <div>
                <Avatar
                    imageUrl={user.profilePicture}
                    width={50}
                    height={50}
                    name={user?.username}
                />
            </div>
            <div>
                <div className='font-semibold text-ellipsis line-clamp-1'>
                    {user?.username}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </Link>
    )
}
