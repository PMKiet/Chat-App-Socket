import { IoChatboxEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa6"
import { BiLogOut } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import Avatar from "./Avatar"

export default function SideBar() {
    const { currentUser } = useSelector((state) => state.User)
    return (
        <div className='w-full h-full'>
            <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
                <div >
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`} title='Chat'>
                        <IoChatboxEllipses size={25} />
                    </NavLink>
                    <div className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" title='Add friend'>
                        <FaUserPlus size={25} />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <button className="mx-auto">
                        <Avatar
                            width={40}
                            height={40}
                            name={currentUser?.username}
                            imageUrl={currentUser?.profilePicture}
                        />
                    </button>
                    <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" title='Logout'>
                        <span className="">
                            <BiLogOut size={25} />
                        </span>
                    </button>
                </div>
            </div>
        </div >
    )
}
