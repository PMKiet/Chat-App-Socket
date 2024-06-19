import logo from '../assets/logo.png'

export const AuthLayout = ({ children }) => {
    return (
        <>
            <div className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
                <img src={logo} alt="logo" width={100} height={60} />
            </div>
            {children}
        </>
    )
}
