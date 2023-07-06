"use client"

import Modal from '@/app/components/modals/Modal'
import Image from 'next/image'
import { FC } from 'react'

interface ImageModalProps {
    src?: string | null
    isOpen?: boolean
    onClose: () => void
}

const ImageModal: FC<ImageModalProps> = ({
    src,
    isOpen,
    onClose
}) => {
    if (!src) return null
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <Image
                    alt='image'
                    className='object-cover'
                    fill
                    src={src}
                />
            </div>
        </Modal>
    )
}

export default ImageModal