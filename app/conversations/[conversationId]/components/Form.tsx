"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { set } from "date-fns";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post(`/api/messages`, {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post(`/api/messages`, {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return <div
        className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        >
            <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                placeholder='Type a message...'
            />
            <button
                className="rounded-full p-2 bg-sky-500 cursor-pointer transition hover:bg-sky-600"
                type="submit">
                <HiPaperAirplane size={18} className="text-white" />
            </button>
        </form>
    </div>;
};
export default Form;
