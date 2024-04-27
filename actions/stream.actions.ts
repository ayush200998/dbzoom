'use server'

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('No user found');
    if (!apiKey) throw new Error('No Api key found');
    if (!apiSecret) throw new Error('No Api secret found');

    const client = new StreamClient(apiKey, apiSecret);

    const tokenExpiry = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const tokenIssuesAt = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, tokenExpiry, tokenIssuesAt);

    return token;
} 