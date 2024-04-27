'use client'

import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import Image from 'next/image';
  

interface MeetingDialog {
    id: string;
    title: string;
    description?: string;
    className?: string;
    children?: ReactNode;
    buttonText: string;
    isOpen: boolean,
    image?: string;
    buttonIcon?: string;
    handleOnClick: () => void;
    handleOnClose: () => void;
}

const MeetingDialog: React.FC<MeetingDialog> = (props) => {
    const {
        id,
        title,
        description,
        buttonText,
        isOpen,
        image,
        children,
        buttonIcon,
        handleOnClick,
        handleOnClose,
    } = props;

  return (
    <Dialog
        open={isOpen}
        onOpenChange={handleOnClose}
    >
    <DialogContent
        className='flex flex-col w-full max-w-[512px] bg-dark-1 text-white px-4 py-6 border-none'
    >
        <div className='flex flex-col gap-4'>
                {image && (
                    <div className='flex justify-center'>
                        <Image 
                            src={image}
                            alt={id}
                            width={70}
                            height={70}
                        />
                    </div>
                )}

            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>
                    {title}
                </h1>
                {children}

                <p className='text-sm'>
                    {description}
                </p>
            </div>

            <Button
                className='bg-blue-1 w-full hover:bg-blue-2 border-none gap-3'
                onClick={handleOnClick}
            >
                {buttonIcon && (
                    <Image 
                        src={buttonIcon}
                        alt='button-icon'
                        width={24}
                        height={24}
                    />
                )}
                {buttonText}
            </Button>
        </div>
    </DialogContent>
    </Dialog>
  )
}

export default MeetingDialog