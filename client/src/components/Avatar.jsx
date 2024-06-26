import { PiUserCircle } from "react-icons/pi"

export default function Avatar({ userId, name, imageUrl, width, height }) {

    let avatarName = ''
    if (name) {
        const splitName = name?.split('')

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[0]
        } else {
            avatarName = splitName[0]
        }
    }
    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-cyan-200',
        'bg-blue-200',
        'bg-sky-200',
    ]

    const randomNumber = Math.floor(Math.random() * 9)

    return (
        <div className={`text-slate-800 overflow-hidden rounded-full shadow text-xl font-bold   ${bgColor[randomNumber]}`}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className="overflow-hidden rounded-full"
                    />
                ) : (
                    name ? (
                        <div style={{ width: width + 'px', height: height + 'px' }} className="overflow-hidden rounded-full flex items-center justify-center">
                            {avatarName}
                        </div>
                    ) : (
                        <PiUserCircle />
                    )
                )
            }
        </div >
    )
}
