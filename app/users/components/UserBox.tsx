"use client"

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/modals/LoadingModal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {

    const router = useRouter()
    const [isloading, setIsloading] = useState(false)

    const handleClick = useCallback(() => {
        setIsloading(true)
        axios.post('/api/conversations', {
            userId: data.id
        })
            .then(data => {
                router.push(`/conversations/${data.data.id}`)
            })
            .finally(() => setIsloading(false))
    }, [data, router])

    return (
        <>
            {isloading &&
                <LoadingModal />
            }
            <div onClick={handleClick}
                className="w-full relative flex items-center space-x-3 bg-white hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3"
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="foucs:outline-none">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-gray-900">
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default UserBox