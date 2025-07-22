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
    } = props;

    return (
        <Container className=''>
            {/* Left section */}
            <section className='flex gap-4 items-center px-4'>
                <div className='text-center'>
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className='text-sm'>{day}</p>
                </div>

                <div className='flex flex-col text-center space-y-3 px-4'>
                    <span className='text-5xl'>{convertKelvinToCelsius(temp ?? 0)}°</span>
                    <p className='text-xs space-x-1 whitespace-nowrap'>
                        <span>Feels like</span>
                        <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
                    </p>
                    <p className='capitalize'>{description}</p>
                </div>
            </section>

            {/* Right section */}
            <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}
