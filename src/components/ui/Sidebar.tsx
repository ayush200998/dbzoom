'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// Constants
import { sidebarLinks } from '../../../constants'

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white lg:w-[264px] max-sm:hidden'>
        <div className='flex flex-col gap-6'>
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
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

                        <p className='max-md:hidden'>
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </div>
    </section>
  )
}

export default Sidebar