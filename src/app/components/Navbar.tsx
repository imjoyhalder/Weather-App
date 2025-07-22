
import React from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from './SearchBox';

type Props = {} 

export default function Navbar({ }: Props) {
    return (
        <nav className='shadow-sm sticky  top-0 left-0 bg-gray-100'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                <div className='flex items-center justify-center gap-2 '>
                    <h2 className='text-gray-500 text-3xl'>Weather</h2>
                    <IoSunnyOutline className='text-3xl mt-1 text-yellow-300' />
                </div>
                {/* Location & search bar section */}
                <section className='hidden md:flex gap-2 items-center '>
                    <MdMyLocation className='text-2xl text-gray-400  hover:opacity-80 cursor-pointer' />
                    <FaLocationDot className='text-2xl' />
                    <p className='text-slate-900/80 text-sm'>
                        Bangladesh
                    </p>

                    {/* Search Bar section */}
                    <div>
                        <SearchBox></SearchBox>
                    </div>
                </section>
            </div>
        </nav>
    )
}