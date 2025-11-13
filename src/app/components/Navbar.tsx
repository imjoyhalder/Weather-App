// components/Navbar.tsx - Search functionality fixed
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import SearchBox from './SearchBox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loadingAtom, placeAtom } from '../atom';

type Props = {}

export default function Navbar({ }: Props) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Bangladesh');
    const [place, setPlace] = useAtom(placeAtom);
    const [loading, setLoading] = useAtom(loadingAtom);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get current location
    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
                        );
                        if (response.data.length > 0) {
                            const location = response.data[0];
                            setCity(location.name);
                            setPlace(location.name);
                            setCurrentLocation(location.name);
                            setError('');
                        }
                    } catch (error) {
                        setError('Failed to get current location');
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    setError('Location access denied');
                    setLoading(false);
                }
            );
        }
    };

    async function handleInputChange(value: string) {
        setCity(value);
        setError('');

        if (value.length >= 2) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
                );

                if (response.data.list && response.data.list.length > 0) {
                    const suggestions = response.data.list.map((item: any) => item.name);
                    setSuggestions(suggestions);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setPlace(value);
        setCurrentLocation(value);
        setShowSuggestions(false);
        setError('');
    }

    const handleSubmitSearch = (value: string) => {
        if (value.trim() === '') {
            setError('Please enter a location');
            return;
        }

        setPlace(value);
        setCurrentLocation(value);
        setShowSuggestions(false);
        setError('');
    };

    return (
        <nav className='sticky top-0 left-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-4 md:px-6 mx-auto'>
                {/* Branding */}
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <IoSunnyOutline className='text-3xl md:text-4xl text-yellow-400' />
                        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-50'></div>
                    </div>
                    <div>
                        <h2 className='text-gray-800 text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                            WeatherBD
                        </h2>
                        <p className='text-xs text-gray-500 hidden md:block'>Bangladesh Weather</p>
                    </div>
                </div>

                {/* Location & Search - Desktop */}
                <section className='hidden md:flex relative gap-4 items-center'>
                    <div
                        className='flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors group'
                        onClick={handleGetCurrentLocation}
                    >
                        <MdMyLocation className='text-xl text-blue-600 group-hover:text-blue-700 transition-colors' />
                        <span className='text-sm text-blue-700 font-medium'>Current</span>
                    </div>

                    <div className='flex items-center gap-2 text-gray-600'>
                        <FiMapPin className='text-lg' />
                        <p className='text-sm font-medium max-w-[120px] truncate'>
                            {currentLocation || 'Bangladesh'}
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className='relative w-64 lg:w-80' ref={suggestionsRef}>
                        <SearchBox
                            value={city}
                            onChange={handleInputChange}
                            onSubmit={handleSubmitSearch}
                            loading={loading}
                            placeholder="Search city in Bangladesh..."
                        />
                        <SuggestionBox
                            {...{
                                showSuggestions,
                                suggestions,
                                handleSuggestionClick,
                                error,
                                loading
                            }}
                        />
                    </div>
                </section>

                {/* Mobile menu button */}
                <div className='md:hidden'>
                    <button className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Search & Location Section */}
            <div className='md:hidden flex flex-col items-center px-4 pb-4 gap-3 bg-white/95 backdrop-blur-sm'>
                <div className='flex items-center justify-between w-full gap-3'>
                    <div
                        className='flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors flex-1 justify-center'
                        onClick={handleGetCurrentLocation}
                    >
                        <MdMyLocation className='text-lg text-blue-600' />
                        <span className='text-sm text-blue-700 font-medium'>Current Location</span>
                    </div>

                    <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg flex-1 justify-center'>
                        <FiMapPin className='text-lg' />
                        <p className='text-sm font-medium truncate max-w-[100px]'>
                            {currentLocation || 'Bangladesh'}
                        </p>
                    </div>
                </div>

                <div className='w-full relative' ref={suggestionsRef}>
                    <SearchBox
                        value={city}
                        onChange={handleInputChange}
                        onSubmit={handleSubmitSearch}
                        loading={loading}
                        placeholder="Search city..."
                    />
                    <SuggestionBox
                        {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error,
                            loading
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
    error,
    loading
}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
    loading: boolean;
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 0) || error || loading) && (
                <div className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 py-2 z-50 max-h-60 overflow-y-auto'>
                    {loading && (
                        <div className='flex items-center justify-center py-4'>
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2'></div>
                            <span className='text-gray-600 text-sm'>Searching locations...</span>
                        </div>
                    )}

                    {error && !loading && (
                        <div className='px-4 py-3 text-red-600 bg-red-50 border-b border-red-100 flex items-center gap-2 text-sm'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {suggestions.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleSuggestionClick(item)}
                            className='w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 group text-sm'
                        >
                            <FiMapPin className='text-gray-400 group-hover:text-blue-500 transition-colors' />
                            <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>{item}</span>
                        </button>
                    ))}

                    {suggestions.length === 0 && !error && !loading && showSuggestions && (
                        <div className='px-4 py-3 text-gray-500 text-center text-sm'>
                            No locations found
                        </div>
                    )}
                </div>
            )}
        </>
    );
}