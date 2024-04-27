'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Button } from './button';
import { Call } from '@stream-io/video-react-sdk';

interface MeetingCardProps {
    type: 'ended' | 'upcoming' | 'recordings';
    meetingTitle: string,
    meetingStartDate: Date,
    renderActionButtons?: Function,
}

const MeetingCard: React.FC<MeetingCardProps> = (props) => {
    const {
        type,
        meetingTitle,
        meetingStartDate,
        renderActionButtons,
    } = props;

    const formattedStartTime = new Date(meetingStartDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });

    const getIconsSrc = () => {
        switch (type) {
            case 'ended':
                return '/icons/call-ended.svg';
            
            case 'upcoming':
                return '/icons/upcoming.svg';

            case 'recordings':
                return '/icons/Video.svg';

            default:
                return '';
        }
    };

    const getIconAlt = () => {
        switch (type) {
            case 'ended':
                return 'ended';
            
            case 'upcoming':
                return 'upcoming';

            case 'recordings':
                return 'recordings';

            default:
                return '';
        }
    };

  return (
    <section
        id='meeting-card'
        className='flex flex-col bg-dark-1 p-6 rounded-lg gap-5'
    >
        <Image
            src={getIconsSrc()}
            alt={getIconAlt()}
            width={30}
            height={30}
        />
        <div
            className='flex flex-col gap-2'
        >
            <h1 className='text-2xl font-bold'>
                {meetingTitle}
            </h1>
            <p
                className='text-sky-1'
            >
                {formattedStartTime}
            </p>
        </div>

        {renderActionButtons && (
            <div
                className='flex items-center justify-between w-full'
            >
                {/* participants */}
                <div className='flex gap-4'>
                    {renderActionButtons()}
                </div>
            </div>
        )}
    </section>
  )
}

export default MeetingCard