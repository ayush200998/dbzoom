import Image from 'next/image';
import React from 'react'

interface HomeCardProps {
    id: string;
    img: string;
    title: string;
    description: string;
    color: string,
    handleOnClick: () => void;
}

const HomeCard: React.FC<HomeCardProps> = (props) => {
    const {
        id,
        img,
        title,
        description,
        color,
        handleOnClick,
    } = props;

  return (
    <div
        id={id}
        className={`${color} w-full px-4 py-6 flex flex-col justify-between rounded-[14px] min-h-[230px] cursor-pointer`}
        onClick={handleOnClick}
    >
        <div className='flex-center gap-2 glassmorphism p-2 w-fit rounded-sm'>
            <Image 
                src={img}
                alt={id}
                width={24}
                height={24}
            />
        </div>

        <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>
                {title}
            </h1>

            <p className='text-xl'>
                {description}
            </p>
        </div>
    </div>
  )
}

export default HomeCard