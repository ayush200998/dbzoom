'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button';

const MeetingSetup = ({ setIsSetupCompleted }: { setIsSetupCompleted: (value: boolean) => void }) => {
    const [isMicAndCamToggleOn, setIsMicAndCamToggleOn] = useState(false);

    const call = useCall();

    useEffect(() => {
        if (isMicAndCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [
        isMicAndCamToggleOn,
        call?.camera,
        call?.microphone
    ])
  return (
    <div
        id='meeting-setup-container'
        className='flex flex-col h-screen w-full items-center justify-center text-white gap-3 p-2'
    >
        <h1
            className='text-2xl font-bold'
        >
            Setup
        </h1>

        <VideoPreview
            // className='video-preview'
            mirror={false}
        />
        <div
            className='flex justify-center items-center h-16 gap-3'
        >
            <label
                className='flex justify-center items-center h-16 gap-2 font-medium'
            >
                <input 
                    type='checkbox'
                    checked={isMicAndCamToggleOn}
                    onChange={(e) => setIsMicAndCamToggleOn(e.target.checked)}
                />
                Turn of microphone and camera
            </label>

            <DeviceSettings />
        </div>
        <Button
            className='rounded-md px-4 py-2.5 bg-mustard-3 hover:bg-mustard-2'
            onClick={() => {
                call?.join();
                setIsSetupCompleted(true);
            }}
        >
            Join meeting
        </Button>
    </div>
  )
}

export default MeetingSetup