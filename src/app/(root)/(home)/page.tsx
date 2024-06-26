import MeetingTypesList from '@/components/ui/MeetingTypesList';
import React from 'react'

const Home = () => {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentDayDetails = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
          <div className='flex flex-col justify-between h-full p-5 max-md:px-5 max-md:py-8 lg:p-11'>
            <h2 className='glassmorphism max-w-[270px] rounded p-2 text-center text-base font-normal'>
              Welcome, Create your meetings or join an existing meeting
            </h2>

            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-extrabold lg:text-6xl'>
                {currentTime}
              </h1>

              <p className='text-lg font-medium lg:text-2xl text-sky-1'>
                {currentDayDetails}
              </p>
            </div>
          </div>
        </div>

      <MeetingTypesList />
    </section>
  )
}

export default Home