// components/ForecastWeatherDetails.tsx - Fixed props
import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import { WeatherDetails, WeatherDetailsProps } from './WeatherDetails'
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius'

export interface ForecastWeatherDetailsProps extends WeatherDetailsProps {
    weatherIcon: string
    date: string
    day: string
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    description: string
    isToday?: boolean
}

export const ForecastWeatherDetails = (props: ForecastWeatherDetailsProps) => {
    const {
        weatherIcon = '02d',
        date = '19.09',
        day = 'Tuesday',
        temp,
        feels_like,
        temp_min,
        temp_max,
        description,
        isToday = false,
    } = props;

    return (
        <Container className={`p-6 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${isToday
                ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-sm'
                : 'bg-white/80 border-gray-100'
            }`}>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                {/* Left section */}
                <section className='flex items-center gap-6 flex-1'>
                    <div className='text-center relative'>
                        <div className='relative'>
                            <WeatherIcon iconName={weatherIcon} className='w-20 h-20' />
                            {isToday && (
                                <div className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full'>
                                    Today
                                </div>
                            )}
                        </div>
                        <div className='mt-3'>
                            <p className='text-lg font-semibold text-gray-800'>{date}</p>
                            <p className='text-sm text-gray-600'>{day}</p>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <div className='flex items-baseline gap-2 mb-2'>
                            <span className='text-4xl lg:text-5xl font-bold text-gray-800'>
                                {convertKelvinToCelsius(temp ?? 0)}°
                            </span>
                            <div className='flex gap-1 text-sm text-gray-600'>
                                <span>H: {convertKelvinToCelsius(temp_max ?? 0)}°</span>
                                <span>•</span>
                                <span>L: {convertKelvinToCelsius(temp_min ?? 0)}°</span>
                            </div>
                        </div>

                        <p className='text-sm text-gray-600 mb-2 flex items-center gap-1'>
                            <span>Feels like</span>
                            <span className='font-medium text-gray-700'>
                                {convertKelvinToCelsius(feels_like ?? 0)}°
                            </span>
                        </p>

                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                            <p className='text-gray-700 font-medium capitalize'>{description}</p>
                        </div>
                    </div>
                </section>

                {/* Right section */}
                <section className='lg:w-auto'>
                    <WeatherDetails {...props} />
                </section>
            </div>
        </Container>
    );
}