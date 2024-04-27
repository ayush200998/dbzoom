'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingDialog from './MeetingDialog';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './textarea';
import { Input } from "@/components/ui/input"
import ReactDatePicker from 'react-datepicker';

const MeetingTypesList = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [currentMeetingType, setCurrentMeetingType] = useState<'isInstantMeeting' | 'isJoiningMeeting' | 'isScheduleMeeting' | undefined>();
    const [meetingDetails, setMeetingDetails] = useState({
        startsAt: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    const createMeeting = async () => {
        if (!user || !client) return;

        try {
            const callId = crypto.randomUUID();
            const call = client.call('default', callId);

            if (!call) throw new Error('Failed to create call');

            const meetingStartTime = meetingDetails.startsAt.toISOString() || new Date(Date.now()).toISOString();
            const meetingDescription = meetingDetails.description || 'Instant meeting';

            const response = await call.getOrCreate({
                data: {
                    starts_at: meetingStartTime,
                    custom: {
                        description: meetingDescription,
                    }
                }
            });
            setCallDetails(call);

            if (!meetingDetails.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: 'Meeting created successfully',
            })
        } catch (error) {
            toast({
                title: 'Failed to create meeting',
            })
            console.log(error);
        }
    };

  return (
    <section
        id='meeting-types-list-container'
        className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'
    >
        <HomeCard 
            id='create-meeting'
            img='/icons/add-meeting.svg'
            title='New Meeting'
            description='Start an instant meeting'
            color='bg-blue-2'
            handleOnClick={() => setCurrentMeetingType('isInstantMeeting')}
        />

        <HomeCard 
            id='join-meeting'
            img='/icons/join-meeting.svg'
            title='Join Meeting'
            description='Via invitattion link'
            color='bg-mustard-1'
            handleOnClick={() => setCurrentMeetingType('isJoiningMeeting')}
        />

        <HomeCard 
            id='schedule-meeting'
            img='/icons/schedule.svg'
            title='Schedule a Meeting'
            description='Plan your meetings'
            color='bg-mustard-2'
            handleOnClick={() => setCurrentMeetingType('isScheduleMeeting')}
        />

        <HomeCard 
            id='view-recording'
            img='/icons/recordings.svg'
            title='View Recordings'
            description='All meeting recordings'
            color='bg-rose-1'
            handleOnClick={() => router.push('/recordings')}
        />


        {!callDetails ? (
            <MeetingDialog
                id='create-meeting-dialog'
                title='Create meeting'
                description=''
                buttonText='Schedule meeting'
                isOpen={currentMeetingType === 'isScheduleMeeting'}
                handleOnClick={() => createMeeting()}
                handleOnClose={() => setCurrentMeetingType(undefined)}
            >
                <div
                    id='create-meeting-form'
                    className='flex flex-col p-2 gap-2'
                >
                    <div className='flex flex-col gap-2.5'>
                        <label
                            className='text-base text-normal leading-[22px] text-sky-1'
                        >
                            Add a description
                        </label>
                        <Textarea
                            className='border-none bg-dark-4 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setMeetingDetails((prevState) => ({
                                    ...prevState,
                                    description: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div
                        id='date-picker-wrapper'
                        className='flex flex-col gap-2.5'
                    >
                        <label
                            className='text-base text-normal leading-[22px] text-sky-1'
                        >
                            Select date and time
                        </label>

                        <ReactDatePicker 
                            selected={meetingDetails.startsAt}
                            onChange={(date) => setMeetingDetails((prevState) => ({
                                ...prevState,
                                startsAt: date!,
                            }))}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            className='bg-dark-4 rounded w-full p-2'
                        />
                    </div>
                </div>
            </MeetingDialog>
        ) : (
            <MeetingDialog
                id='copy-link-dialog'
                title='Meeting created successfully'
                buttonText='Copy meeting link'
                isOpen={currentMeetingType === 'isScheduleMeeting'}
                handleOnClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({
                        title: 'Link copied'
                    })
                }}
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                handleOnClose={() => setCurrentMeetingType(undefined)}
            />
        )}
        <MeetingDialog
            id='new-meeting-dialog'
            title='Confirm start ?'
            description='This will create a new meeting'
            buttonText='Start meeting'
            isOpen={currentMeetingType === 'isInstantMeeting'}
            handleOnClick={() => createMeeting()}
            handleOnClose={() => setCurrentMeetingType(undefined)}
        />

            <MeetingDialog
                id='join-meeting-dialog'
                title='Join meeting'
                description=''
                buttonText='Join'
                isOpen={currentMeetingType === 'isJoiningMeeting'}
                handleOnClick={() => router.push(meetingDetails.link)}
                handleOnClose={() => setCurrentMeetingType(undefined)}
            >
                <div
                    id='join-meeting-form'
                    className='flex flex-col p-2 gap-2'
                >
                    <div className='flex flex-col gap-2.5'>
                        <Input
                            placeholder='Meeting link'
                            className='border-none bg-dark-4 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setMeetingDetails((prevState) => ({
                                    ...prevState,
                                    link: e.target.value
                                }))
                            }}
                        />
                    </div>
                </div>
            </MeetingDialog>
    </section>
  )
}

export default MeetingTypesList