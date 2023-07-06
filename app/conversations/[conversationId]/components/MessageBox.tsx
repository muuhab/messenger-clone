"use client"

import Avatar from "@/app/components/Avatar";
import useMessageTime from "@/app/hooks/useMessageTime";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    isLast: boolean;
    data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    isLast,
    data
}) => {
    const session = useSession();

    const [imageModalOpen, setImageModalOpen] = useState(false)

    const isOwnMessage = session?.data?.user?.email === data?.sender?.email;
    const seeList = (data.seenByUsers || [])
        .filter(user => user.email !== data?.sender?.email).map(user => user.name)
        .join(', ')

    const container = clsx(
        "flex gap-3 p-4",
        isOwnMessage && "justify-end"
    )

    const avatar = clsx(isOwnMessage && 'order-2')

    const body = clsx(
        "flex flex-col gap-1",
        isOwnMessage && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwnMessage ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )

    const formattedDate = useMessageTime(data.createdAt)

    return <div className={container}>
        <div className={avatar}>
            <Avatar
                user={data.sender}
            />
        </div>
        <div className={body}>
            <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500">
                    {data.sender.name}
                </div>
                <div className="text-sx text-gray-400">
                    {/* {format(new Date(data.createdAt), 'p')} */}
                    {formattedDate}

                </div>
            </div>
            <div className={message}>
                <ImageModal
                    src={data.image}
                    isOpen={imageModalOpen}
                    onClose={() => setImageModalOpen(false)}
                />
                {data.image ? (
                    <Image
                        onClick={() => setImageModalOpen(true)}
                        alt='Image'
                        src={data.image}
                        width={288}
                        height={288}
                        className="
                        object-cover cursor-pointer hover:scale-110 transition translate
                        "
                    />
                )
                    : (
                        <div>
                            {data.body}
                        </div>
                    )

                }
            </div>
            {isLast && isOwnMessage && seeList.length > 0 && (
                <div className="text-sx font-light text-gray-500">
                    {`Seen by ${seeList}`}
                </div>
            )}
        </div>
    </div>;
};
export default MessageBox;
