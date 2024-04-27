'use client'

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// Constants
import { sidebarLinks } from '../../../constants'

// Custom components
import Sidebar from './Sidebar'

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section
        id='mobile-nav'
        className='lg:hidden md:hidden'
    >
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src='/icons/hamburger.svg'
                    alt='menu icon'
                    width={32}
                    height={32}
                    className='max-sm:size-10'
                />
            </SheetTrigger>
            <SheetContent
                side='left'
                className='bg-dark-1 text-white'
            >
                <Link
                    href='/'
                    className='flex items-center gap-2'
                >
                    <Image 
                        src='/icons/logo.svg'
                        alt='Room'
                        width={32}
                        height={32}
                        className='max-sm:size-10'
                    />
                    <p className='text-[26px] text-white font-extrabold'>
                        DbZoom
                    </p>
                </Link>

                <div
                    className='flex flex-col h-[calc(100vh-72px))] overflow-y-auto'
                >
                <section
                    className='flex h-full flex-col gap-6 pt-16 text-white'
                >
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;

                        return (
                            <SheetClose key={link.label} asChild>
                                <Link
                                key={link.label}
                                href={link.route}
                                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                                    'bg-blue-1': isActive,
                                })}
                                >
                                <Image
                                src={link.icon}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />
                                    
                                    <p className='text-white'>
                                    {link.label}
                                    </p>
                                </Link>
                            </SheetClose>
                        );
                    })}
                </section>

                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav