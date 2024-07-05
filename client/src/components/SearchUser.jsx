import { useEffect, useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import Loading from "./Loading"
import UserSearchCard from "./UserSearchCard"
import { toast } from "react-toastify"

export default function SearchUser({ onClose }) {

    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const handleSearchUser = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/user/searchUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search })
            })
            const data = await res.json()
            if (!res.ok) {
                setLoading(true)
                return
            }
            if (res.ok) {
                setSearchUser(data.data)
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        handleSearchUser()
    }, [search])
    console.log(search)
    console.log(searchUser)

    return (
        <>
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 z-0 p-2'>
                <div className="w-full max-w-lg mx-auto mt-10 z-10 opacity-100">
                    {/* input search */}
                    <div className="bg-white rounded h-14 overflow-hidden flex">
                        <input
                            type="text"
                            placeholder='Search user by name, email'
                            className='w-full outline-none py-1 h-full px-4'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="h-14 w-14 flex justify-center items-center">
                            <IoSearchOutline size={25} />
                        </div>
                    </div>
                    {/* Display search user */}
                    <div className="bg-white mt-2 w-full p-4 rounded">
                        {/* Not found */}
                        {
                            searchUser && !loading && searchUser.length === 0 && (
                                <p className="text-center text-slate-500">User not found</p>
                            )
                        }
                        {
                            loading && (
                                <Loading />
                            )
                        }
                        {
                            searchUser && searchUser.length !== 0 && !loading && (
                                searchUser.map((user, index) => {
                                    return (
                                        <UserSearchCard key={user._id} user={user} onClose={onClose} />
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
