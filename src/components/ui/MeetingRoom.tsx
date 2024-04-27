'use client'

import { cn } from '@/lib/utils';
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'

import { LayoutIcon, LayoutGrid, LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
  

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isPersonalRoom = !!searchParams.get('personal')

    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader /> 

    const CallLayout = () => {
        switch(layout) {
            case 'grid':
                return <PaginatedGridLayout />

            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
                
            default:
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }
  return (
    <section
        className='h-screen relative w-full overflow-hidden pt-4 text-white'
    >
        <div
            className='relative size-full flex items-center justify-center'
        >
            <div
                className='flex size-full max-w-[1000px] items-center'
            >
                <CallLayout />
            </div>

            <div
                className={cn('h-[calc(100vh - 86px)] hidden ml-2', { 'show-block': showParticipants })}
            >
                <CallParticipantsList
                    onClose={() => setShowParticipants(false)}
                />
            </div>
        </div>

        <div
            className='fixed bottom-0 flex justify-center items-center w-full gap-5 flex-wrap'
        >
            <CallControls onLeave={() => router.push('/')} />

            <DropdownMenu>
                <div className='flex items-center'>
                    <DropdownMenuTrigger
                        className='rounded-2xl bg-dark-3 hover:bg-dark-4 px-4 py-2'
                    >
                        <LayoutIcon
                            size={20}
                            className='text-white'
                        />
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent
                    className='bg-dark-1 p-2 text-white border-none'
                >
                    {['Grid', 'Speaker-right', 'Speaker-left'].map((layoutOption) => (
                        <div
                            id={layoutOption.toLowerCase()}
                            onClick={() => setLayout(layoutOption.toLowerCase() as CallLayoutType)}
                        >
                            <DropdownMenuItem>
                                <div
                                    className='cursor-pointer flex gap-2 items-center'
                                >
                                    {layoutOption.toLowerCase() === 'grid' ? (
                                        <LayoutGrid size={20} />
                                    ) : (
                                        <LayoutList size={20} />
                                    )}
                                    <p> {layoutOption} </p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-dark-4' />
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <CallStatsButton />

            <button
                onClick={() => setShowParticipants((prevState) => !prevState)}
            >
                <div
                    className='rounded-2xl bg-dark-3 hover:bg-dark-4 px-4 py-2'
                >
                    <Users size={20} />
                </div>
            </button>

            {!isPersonalRoom && <EndCallButton />}
        </div>

    </section>
  )
}

export default MeetingRoom