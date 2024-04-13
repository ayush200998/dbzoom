import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav
        id='app-nav'
        className='w-full z-50 flex-between bg-dark-1 px-6 py-4 fixed lg:px-8'
    >
        <Link
            href='/'
            className='flex items-center gap-2'
        >
            <Image 
                src='/icons/logo.svg'
                alt='Db Zoom'
                width={32}
                height={32}
                className='max-sm:size-10'
            />
            <p className='text-[26px] text-white font-extrabold max-sm:hidden'>
                DB Zoom
            </p>
        </Link>

        <div
            id='user-settings'
            className='flex-between gap-5'
        >
            <SignedIn>
                <UserButton /> 
            </SignedIn>
        </div>

        <MobileNav />
    </nav>
  )
}

export default Navbar