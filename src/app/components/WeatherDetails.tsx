import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { LuEye } from "react-icons/lu";
import { PiSpeedometer } from "react-icons/pi";
import { TbSunrise } from "react-icons/tb";
import { FiSunset } from "react-icons/fi";

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}


export const WeatherDetails = (props: WeatherDetailsProps) => {
    const {
        visibility = "25km",
        humidity = '61%',
        windSpeed = '7 km/h',
        airPressure = '1012 hPa',
        sunrise = '6.20',
        sunset = '18 : 48'

    } = props
    return (
        <>
            <SingleWeatherDetails
                icon={<LuEye />}
                information='Visibility'
                value={visibility}
            />
            <SingleWeatherDetails
                icon={<FiDroplet />}
                information='Humidity'
                value={humidity}
            />
            <SingleWeatherDetails
                icon={<LuEye />}
                information='WindSpeed'
                value={windSpeed}
            />
            <SingleWeatherDetails
                icon={<PiSpeedometer />}
                information='Air Pressure'
                value={airPressure}
            />
            <SingleWeatherDetails
                icon={<TbSunrise />}
                information='Sunrise'
                value={sunrise}
            />
            <SingleWeatherDetails
                icon={<FiSunset />}
                information='Sunset'
                value={sunset}
            />
        </>
    )
}

export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string
}

export function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80 '>
            <p className='whitespace-nowrap'>{props?.information}</p>
            <div className='text-3xl'>
                {props.icon}
            </div>
            <p>{props.value}</p>
        </div>
    )
}