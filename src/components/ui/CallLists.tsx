'use client'

import React, { useEffect, useState } from 'react'
import { useGetCalls } from '../../../hooks/useGetAllCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { Button } from './button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui//use-toast';

const CallLists = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const {
    upcomingCalls,
    endedCalls,
    isLoading,
    callRecordings,
  } = useGetCalls();

  const router = useRouter();
  const { toast } = useToast();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      
      case 'upcoming':
        return upcomingCalls;

      case 'recordings':
        return recordings;

      default:
        return [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous calls';
      
      case 'upcoming':
        return 'No Upcoming calls';

      case 'recordings':
        return 'No Recordings';

      default:
        return '';
    }
  };

  const handleOnPrimaryActionButtonClick = (meeting: Call | CallRecording) => {
    const callId = (meeting as Call)?.id;
    switch (type) {
      case 'upcoming': {
        // Re route the user to meeting page with the call id
        router.push(`/meeting/${callId}`);
        return;
      }

      case 'recordings': {
        router.push(`${(meeting as CallRecording).url}`);
        return;
      }

      default:
        return;
    }
  };

  const handleOnSecondaryActionButtonClick = (meeting: Call | CallRecording) => {
    const callId = (meeting as Call)?.id;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callId}`
    const recordingLink = (meeting as CallRecording).url;

    switch (type) {
      case 'upcoming': {
        // Copy the meeting id
        navigator.clipboard.writeText(meetingLink);
        toast({
            title: 'Link copied'
        });
        return;
      }

      case 'recordings': {
        // Copy the meeting id
        navigator.clipboard.writeText(recordingLink);
        toast({
            title: 'Link copied'
        });
        return;
      }

      default:
        return;
    }
  };

  const getPrimaryActionButtonLabel = () => {
    switch (type) {
      case 'upcoming':
        return 'Start';
      
      case 'recordings':
        return 'Play';

      default:
        return '';
    }
  }

  const getSecondaryActionButtonLabel = () => {
    switch (type) {
      case 'upcoming':
      case 'recordings':
        return 'Copy';

      default:
        return '';
    }
  };

  const getPrimaryActionButtonIcon = () => {
    switch (type) {

      case 'recordings':
        return '/icons/play.svg';

        case 'upcoming':
          return '/icons/play.svg';

      default:
        return '';
    }
  };

  const getSecondaryActionButtonIcon = () => {
    switch (type) {
      case 'upcoming':
      case 'recordings':
        return '/icons/copy.svg';

      default:
        return '';
    }
  };

  const getActionButtons = (meeting: Call) => {
    if (['upcoming', 'recordings'].includes(type)) {
      return (
        <>
          <Button
              className='bg-blue-1 flex flex-1 hover:bg-blue-2 border-none gap-3'
              onClick={() => handleOnPrimaryActionButtonClick(meeting as Call)}
          >
            <Image
                src={getPrimaryActionButtonIcon()}
                alt='image-icon'
                width={20}
                height={20}
            />
            {getPrimaryActionButtonLabel()}
          </Button>

          <Button
              className='border border-blue-700 flex flex-1 hover:border-blue-2 border-none gap-3'
              onClick={() => handleOnSecondaryActionButtonClick(meeting as Call)}
          >
            <Image
                src={getSecondaryActionButtonIcon()}
                alt='copy-icon'
                width={24}
                height={24}
            />
            {getSecondaryActionButtonLabel()}
          </Button>
        </>
      );
    }
  };

  useEffect(() => {
    const getCallRcordings = async () => {
      if (!callRecordings || callRecordings?.length <= 0) return [];

      try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));
  
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
  
        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Cannot load recordings, Please try again or refresh'
        })
      }
    };
    if (type === 'recordings') getCallRcordings();
  }, [
    type,
    callRecordings?.length
  ])

  const calls = getCalls();
  const noCallMessage = getNoCallMessage();

  if (isLoading) return <Loader />

  return (
    <div 
      id='call-lists-container'
      className='grid grid-cols-1 gap-4 xl:grid-cols-2'
    >
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => {
          return (
            <MeetingCard
              key={(meeting as Call)?.id}
              type={type}
              meetingTitle={(meeting as Call)?.state?.custom?.description || `${(meeting as CallRecording)?.filename?.substring(0, 25)}..` || 'No description'}
              meetingStartDate={(meeting as Call).state?.startsAt || new Date()}
              renderActionButtons={() => getActionButtons(meeting as Call)}
            />
          );
      }) : (
        <h1>
          {noCallMessage}
        </h1>
      )}
    </div>
  )
}

export default CallLists