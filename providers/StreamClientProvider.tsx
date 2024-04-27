'use client'

import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { tokenProvider } from '../actions/stream.actions';
import Loader from '@/components/ui/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    useEffect(() => {
        // This will ask the user to sign in
        if (!user && isLoaded) {
            router.push('/recordings');
        }

        if (!user) return;

        if (!apiKey) throw new Error('No Api ket found');

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider,
        });

        setVideoClient(client);
    }, [user, isLoaded]);

    if (!videoClient) return <Loader />;

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamClientProvider;