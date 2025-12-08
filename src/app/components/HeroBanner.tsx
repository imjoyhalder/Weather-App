// components/HeroBanner.tsx - Fixed version
import React from 'react';
import { FaMapMarkerAlt, FaWind } from 'react-icons/fa';
import { WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';
import { format, fromUnixTime } from 'date-fns';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import WeatherIcon from './WeatherIcon';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';

interface HeroBannerProps {
    data: any;
    place: string;
}

export default function HeroBanner({ data, place }: HeroBannerProps) {
    const firstData = data?.list?.[0];
    const cityData = data?.city;

    if (!firstData || !cityData) {
        return (
            <div className="hero-banner relative min-h-[60vh] flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-xl">Loading weather data...</p>
                </div>
            </div>
        );
    }

    // Safe data extraction with fallbacks
    const currentTemp = convertKelvinToCelsius(firstData.main?.temp ?? 293.15);
    const feelsLike = convertKelvinToCelsius(firstData.main?.feels_like ?? 293.15);
    const highTemp = convertKelvinToCelsius(firstData.main?.temp_max ?? 298.15);
    const lowTemp = convertKelvinToCelsius(firstData.main?.temp_min ?? 288.15);
    const humidity = firstData.main?.humidity ?? 65;
    const windSpeed = firstData.wind?.speed ?? 5;
    const weatherCondition = firstData.weather?.[0]?.description ?? "Clear sky";
    const weatherIcon = firstData.weather?.[0]?.icon ?? "01d";

    const sunrise = cityData.sunrise ?? 1702949452;
    const sunset = cityData.sunset ?? 1702949459;

    return (
        <div className="hero-banner relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Animated Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>

            <div className="relative z-10 text-center max-w-6xl mx-auto px-4 w-full">
                {/* Current Location and Time */}
                <div className="mb-8 mt-2">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaMapMarkerAlt className="text-rose-400 text-xl" />
                        <h1 className="text-4xl pb-2 md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                            {place}, Bangladesh
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-cyan-100 font-light">
                        {format(new Date(), 'EEEE, MMMM dd, yyyy')}
                    </p>
                    <p className="text-lg text-cyan-200 mt-2 capitalize">
                        {weatherCondition}
                    </p>
                </div>

                {/* Main Weather Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                    {/* Temperature and Icon */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <WeatherIcon
                                iconName={getDayOrNightIcon(weatherIcon, firstData.dt_txt)}
                                className="w-24 h-24"
                            />
                            <div className="text-8xl md:text-9xl font-bold relative">
                                {Math.round(currentTemp)}°
                            </div>
                        </div>
                        <p className="text-xl text-cyan-200">
                            Feels like {Math.round(feelsLike)}°
                        </p>
                    </div>

                    {/* Weather Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="weather-card-bg rounded-2xl p-4 text-center backdrop-blur-sm">
                            <WiSunrise className="text-4xl mx-auto text-orange-300" />
                            <p className="text-sm text-cyan-100 mt-1">Sunrise</p>
                            <p className="text-xl font-bold">
                                {format(fromUnixTime(sunrise), 'h:mm a')}
                            </p>
                        </div>
                        <div className="weather-card-bg rounded-2xl p-4 text-center backdrop-blur-sm">
                            <WiSunset className="text-4xl mx-auto text-red-300" />
                            <p className="text-sm text-cyan-100 mt-1">Sunset</p>
                            <p className="text-xl font-bold">
                                {format(fromUnixTime(sunset), 'h:mm a')}
                            </p>
                        </div>
                        <div className="weather-card-bg rounded-2xl p-4 text-center backdrop-blur-sm">
                            <WiHumidity className="text-4xl mx-auto text-blue-300" />
                            <p className="text-sm text-cyan-100 mt-1">Humidity</p>
                            <p className="text-xl font-bold">{humidity}%</p>
                        </div>
                        <div className="weather-card-bg rounded-2xl p-4 text-center backdrop-blur-sm">
                            <FaWind className="text-3xl mx-auto text-green-300" />
                            <p className="text-sm text-cyan-100 mt-1">Wind</p>
                            <p className="text-xl font-bold">{windSpeed} m/s</p>
                        </div>
                    </div>

                    {/* High/Low Temp */}
                    <div className="text-center">
                        <div className="weather-card-bg rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-red-300 font-semibold">High</span>
                                <span className="text-blue-300 font-semibold">Low</span>
                            </div>
                            <div className="flex justify-between items-center text-3xl font-bold">
                                <span className="text-red-400">{Math.round(highTemp)}°</span>
                                <span className="text-blue-400">{Math.round(lowTemp)}°</span>
                            </div>
                            <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-red-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${Math.max(10, Math.min(90, ((currentTemp - lowTemp) / (highTemp - lowTemp)) * 100))}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weather Alert */}
                <div className="bg-yellow-500/20 mb-2 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-4 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-yellow-300 text-lg">🌡️</span>
                        <p className="text-yellow-100 text-sm">
                            {currentTemp >= 30
                                ? `Hot day in ${place}. Stay hydrated!`
                                : currentTemp <= 20
                                    ? `Pleasant weather in ${place}. Perfect for outdoor activities.`
                                    : `Comfortable weather in ${place}. Enjoy your day!`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}