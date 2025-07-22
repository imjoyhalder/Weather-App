'use client'
import React, { useState } from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from './SearchBox';
import axios from 'axios';
import { env } from 'process';
import { set } from 'date-fns';
import { useAtom } from 'jotai';
import { placeAtom } from '../atom';

type Props = {}

export default function Navbar({ }: Props) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false);


    const [place, setPlace] = useAtom(placeAtom)

    async function handleInputChange(value: string) {
        setCity(value)
        if (value.length >= 3) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
                const suggestions = response.data.list.map((item: any) => item.name)
                setSuggestions(suggestions)
                setError('')
                setShowSuggestions(true)

            }
            catch (error) {
                setSuggestions([])
                setShowSuggestions(false)
            }
        }
        else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value)
        setShowSuggestions(false)
    }

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (suggestions.length == 0) {
            setError('Location not found')
        }
        else {
            setError('')
            setPlace(city)
            setShowSuggestions(false)
        }
    }

    // return (
    //     <nav className='shadow-sm sticky  top-0 left-0 bg-gray-100'>
    //         <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
    //             <div className='flex items-center justify-center gap-2 '>
    //                 <h2 className='text-gray-500 text-3xl'>Weather</h2>
    //                 <IoSunnyOutline className='text-3xl mt-1 text-yellow-300' />
    //             </div>

    //             {/* Location & search bar section */}
    //             <section className='flex relative  md:top- gap-2 items-center '>
    //                 <MdMyLocation className='text-2xl text-gray-400  hover:opacity-80 cursor-pointer' />
    //                 <FaLocationDot className='text-2xl' />
    //                 <p className='text-slate-900/80 text-sm'>
    //                     {city}
    //                 </p>

    //                 {/* Search Bar section */}
    //                 <div className='relative'>
    //                     <SearchBox
    //                         value={city}
    //                         onChange={(e) => handleInputChange(e.target.value)}
    //                         onSubmit={handleSubmitSearch}
    //                     />
    //                     <SuggestionBox
    //                         {...{
    //                             showSuggestions,
    //                             suggestions,
    //                             handleSuggestionClick,
    //                             error
    //                         }}
    //                     />
    //                 </div>
    //             </section>
    //         </div>
    //     </nav>
    // )
    return (
        <nav className='shadow-sm sticky top-0 left-0 bg-gray-100 z-50'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                {/* Branding */}
                <div className='flex items-center gap-2'>
                    <h2 className='text-gray-500 text-2xl md:text-3xl'>Weather</h2>
                    <IoSunnyOutline className='text-2xl md:text-3xl mt-1 text-yellow-300' />
                </div>

                {/* Location & Search */}
                <section className='hidden md:flex relative gap-3 items-center'>
                    <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
                    <FaLocationDot className='text-2xl' />
                    <p className='text-slate-900/80 text-sm hidden lg:block'>
                        {city}
                    </p>

                    {/* Search Box */}
                    <div className='relative w-48 md:w-64 lg:w-80'>
                        <SearchBox
                            value={city}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onSubmit={handleSubmitSearch}
                        />
                        <SuggestionBox
                            {...{
                                showSuggestions,
                                suggestions,
                                handleSuggestionClick,
                                error
                            }}
                        />
                    </div>
                </section>
            </div>

            {/* Mobile Search & Location Section */}
            <div className='flex md:hidden flex-col items-center px-4 pb-3 gap-2'>
                <div className='flex items-center gap-2'>
                    <MdMyLocation className='text-xl text-gray-400 hover:opacity-80 cursor-pointer' />
                    <FaLocationDot className='text-xl' />
                    <p className='text-slate-900/80 text-sm'>{city}</p>
                </div>

                <div className='w-full relative'>
                    <SearchBox
                        value={city}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onSubmit={handleSubmitSearch}
                    />
                    <SuggestionBox
                        {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error
                        }}
                    />
                </div>
            </div>
        </nav>
    );

}

function SuggestionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}) {

    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
                    {error && suggestions.length < 1 && (
                        <li className='text-red-500 p-1'>{error}</li>
                    )}
                    {suggestions.map((item, i) => (
                        <li key={i} onClick={() => handleSuggestionClick(item)} className='cursor-pointer p-1 rounded-xl hover:bg-gray-200'>
                            {item}
                        </li>
                    ))}

                </ul>
            )}
        </>
    );

}