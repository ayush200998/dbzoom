import CallLists from '@/components/ui/CallLists'
import React from 'react'

const Personal = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Personal
        </h1>

        <CallLists type='ended' />
    </section>
  )
}

export default Personal