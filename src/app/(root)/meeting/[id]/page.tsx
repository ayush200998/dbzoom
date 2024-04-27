'use client'

import MeetingRoom from '@/components/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { useGetCallId } from '../../../../../hooks/useGetCallId';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';

const page = ({ params: { id } }: { params: { id: string }}) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  const { call, isCallLoading } = useGetCallId(id);

  if (!user && isLoaded) {
    router.push('/recordings');
  }

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main
      id='meeting-page-container'
      className='h-screen w-full'
    >
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupCompleted ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup
              setIsSetupCompleted={setIsSetupCompleted}
            />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default page