import React, { ReactNode } from 'react'
import StreamClientProvider from '../../../providers/StreamClientProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Room",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>
        {children}
      </StreamClientProvider>
    </main>
  )
}

export default RootLayout;