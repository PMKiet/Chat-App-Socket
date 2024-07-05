import { IoChatboxEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa6"
import { BiLogOut } from "react-icons/bi"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Avatar from "./Avatar"
import { useState } from "react"
import EditOpenDetails from "./EditOpenDetails"
import { toast } from "react-toastify"
import { signOutSuccess } from "../redux/user"
import { FiArrowUpLeft } from "react-icons/fi"
import SearchUser from "./SearchUser"

export default function SideBar() {
    const { currentUser } = useSelector((state) => state.User)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: 'post'
            })
            const data = res.json()
            if (!res.ok) {
                console.log(data.message)
                toast.warning(data.message)
            } else {
                dispatch(signOutSuccess())
                navigate('/sign_in')
            }
        } catch (error) {
            toast.error('LogOut Error')
            console.log(error)
        }
    }

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
                <div >
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`} title='Chat'>
                        <IoChatboxEllipses size={25} />
                    </NavLink>
                    <div onClick={() => setOpenSearchUser(true)} className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" title='Add friend'>
                        <FaUserPlus size={25} />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <button className="mx-auto" title={currentUser?.username} onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={currentUser?.username}
                            imageUrl={currentUser?.profilePicture}
                        />
                    </button>
                    <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" title='Logout'>
                        <span className="" onClick={() => handleSignOut()}>
                            <BiLogOut size={25} />
                        </span>
                    </button>
                </div>
            </div>
            <div className="w-full">
                <div className="text-xl font-bold p-4 text-slate-800 h-16">message</div>
                <div className="bg-slate-200 p-[0.5px]"></div>
                <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
                    {
                        allUser && allUser.length === 0 && (
                            <div className="mt-10">
                                <div className="flex justify-center items-center my-4 text-slate-400">
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className="text-lg text-center text-slate-400">Explore users to start conversation</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {editUserOpen && <EditOpenDetails onClose={() => setEditUserOpen(false)} />}
            {openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(false)} />
            )}
        </div >
    )
}
