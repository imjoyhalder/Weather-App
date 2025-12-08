// components/WeatherLoading.tsx
'use client'
import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

export default function LoadingSpinner() {
    const weatherIcons = [
        { icon: WiDaySunny, color: 'text-yellow-400' },
        { icon: WiCloud, color: 'text-gray-400' },
        { icon: WiRain, color: 'text-blue-400' },
        { icon: WiSnow, color: 'text-cyan-300' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
                {/* Animated Weather Icons */}
                <div className="relative mb-8">
                    <div className="flex justify-center gap-6 mb-6">
                        {weatherIcons.map((WeatherIcon, index) => (
                            <div
                                key={index}
                                className="relative"
                                style={{
                                    animation: `float 3s ease-in-out ${index * 0.5}s infinite`
                                }}
                            >
                                <WeatherIcon.icon 
                                    className={`text-4xl ${WeatherIcon.color} opacity-70`}
                                />
                                <div className={`absolute inset-0 ${WeatherIcon.color} blur-sm opacity-50`}>
                                    <WeatherIcon.icon className="text-4xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Main Loading Spinner */}
                    <div className="relative mx-auto w-20 h-20 mb-6">
                        <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        <div className="absolute inset-4 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <WiDaySunny className="text-2xl text-yellow-300 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        Loading Weather Data
                    </h2>
                    <p className="text-white/80 text-lg animate-pulse">
                        Fetching latest forecast...
                    </p>
                    
                    {/* Animated Dots */}
                    <div className="flex justify-center gap-1 mt-4">
                        {[0, 1, 2].map((dot) => (
                            <div
                                key={dot}
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{
                                    animationDelay: `${dot * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Weather Facts */}
                <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-md mx-auto">
                    <p className="text-sm text-white/70 italic">
                        The highest temperature ever recorded in Bangladesh was 45.1°C in Rajshahi
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 w-64 mx-auto bg-white/20 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse"
                        style={{
                            animation: 'progress 2s ease-in-out infinite alternate'
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                
                @keyframes progress {
                    0% { width: 30%; }
                    100% { width: 80%; }
                }
            `}</style>
        </div>
    );
}