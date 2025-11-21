import React from 'react'
import { LuEye } from "react-icons/lu";
import { MdWaterDrop } from "react-icons/md";
import { TbWind } from "react-icons/tb";
import { WiBarometer, WiSunrise, WiSunset } from "react-icons/wi";

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
    windDirection?: string;
    feelsLike?: string;
    uvIndex?: string;
    precipitation?: string;
}

interface WeatherDetailConfig {
    icon: React.ReactNode;
    information: string;
    value: string;
    unit?: string;
    color?: string;
    description?: string;
}

export const WeatherDetails = (props: WeatherDetailsProps) => {
    const {
        visibility = "25km",
        humidity = '61%',
        windSpeed = '7 km/h',
        airPressure = '1012 hPa',
        sunrise = '6:20',
        sunset = '18:48',
        windDirection = 'NE'
    } = props;

    const getHumidityColor = (humidity: string) => {
        const value = parseInt(humidity);
        if (value >= 80) return 'text-blue-600';
        if (value >= 60) return 'text-green-600';
        if (value >= 40) return 'text-yellow-600';
        return 'text-orange-600';
    };

    const getWindColor = (speed: string) => {
        const value = parseInt(speed);
        if (value >= 20) return 'text-red-500';
        if (value >= 10) return 'text-orange-500';
        if (value >= 5) return 'text-yellow-500';
        return 'text-green-500';
    };

    const weatherDetails: WeatherDetailConfig[] = [
        {
            icon: <LuEye className="text-xl" />,
            information: 'Visibility',
            value: visibility,
            unit: 'km',
            color: 'text-gray-600',
            description: visibility === '25km' ? 'Perfect' : 'Good'
        },
        {
            icon: <MdWaterDrop className="text-xl" />,
            information: 'Humidity',
            value: humidity,
            unit: '%',
            color: getHumidityColor(humidity),
            description: parseInt(humidity) >= 60 ? 'High' : 'Comfortable'
        },
        {
            icon: <TbWind className="text-xl" />,
            information: 'Wind Speed',
            value: windSpeed.split(' ')[0],
            unit: 'km/h',
            color: getWindColor(windSpeed),
            description: windDirection
        },
        {
            icon: <WiBarometer className="text-2xl" />,
            information: 'Pressure',
            value: airPressure.split(' ')[0],
            unit: 'hPa',
            color: 'text-purple-600'
        },
        {
            icon: <WiSunrise className="text-2xl" />,
            information: 'Sunrise',
            value: sunrise,
            color: 'text-orange-500',
            description: 'AM'
        },
        {
            icon: <WiSunset className="text-2xl" />,
            information: 'Sunset',
            value: sunset,
            color: 'text-red-500',
            description: 'PM'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 w-full">
            {weatherDetails.map((detail, index) => (
                <SingleWeatherDetails
                    key={detail.information}
                    {...detail}
                    index={index}
                />
            ))}
        </div>
    );
}

export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string;
    unit?: string;
    color?: string;
    description?: string;
    index?: number;
}

export function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div
            className="flex flex-col items-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
            style={{ animationDelay: `${(props.index || 0) * 100}ms` }}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl mb-3 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors border border-blue-100">
                <div className={props.color || 'text-blue-600'}>{props.icon}</div>
            </div>

            <div className="text-center mb-1">
                <span className="text-2xl font-bold text-gray-800">{props.value}</span>
                {props.unit && (
                    <span className="text-sm font-medium text-gray-500 ml-1">{props.unit}</span>
                )}
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{props.information}</p>

            {props.description && (
                <p className="text-xs text-gray-400 font-medium">{props.description}</p>
            )}
        </div>
    );
}

export const WeatherStats = ({ feelsLike, uvIndex, precipitation }: {
    feelsLike: string;
    uvIndex: string;
    precipitation: string;
}) => {
    const getUVColor = (uv: string) => {
        const value = parseInt(uv);
        if (value >= 8) return 'text-red-500';
        if (value >= 6) return 'text-orange-500';
        if (value >= 3) return 'text-yellow-500';
        return 'text-green-500';
    };

    const stats = [
        {
            label: 'Feels Like',
            value: feelsLike,
            icon: '🌡️',
            color: 'text-orange-600'
        },
        {
            label: 'UV Index',
            value: uvIndex,
            icon: '☀️',
            color: getUVColor(uvIndex)
        },
        {
            label: 'Precipitation',
            value: precipitation,
            icon: '💧',
            color: 'text-blue-600'
        }
    ];

    return (
        <div className="flex gap-4 justify-center">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex flex-col items-center p-3 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20"
                >
                    <span className="text-lg mb-1">{stat.icon}</span>
                    <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
            ))}
        </div>
    );
};
