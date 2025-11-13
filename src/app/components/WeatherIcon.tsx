import { cn } from '@/utils/cn';
import Image from 'next/image';
import React from 'react';

interface WeatherIconProps extends React.HTMLProps<HTMLDivElement> {
    iconName: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    description?: string;
    showDescription?: boolean;
}

export default function WeatherIcon({ 
    iconName, 
    className, 
    size = 'md',
    description,
    showDescription = false,
    ...rest 
}: WeatherIconProps) {
    const sizeClasses = {
        sm: 'h-12 w-12',
        md: 'h-20 w-20',
        lg: 'h-24 w-24',
        xl: 'h-32 w-32'
    };

    const getAnimationClass = (iconName: string) => {
        if (iconName.includes('01d')) return 'animate-pulse-slow'; // Clear sky day
        if (iconName.includes('01n')) return 'animate-pulse-slower'; // Clear sky night
        if (iconName.includes('02') || iconName.includes('03') || iconName.includes('04')) 
            return 'animate-float'; // Clouds
        if (iconName.includes('09') || iconName.includes('10')) 
            return 'animate-bounce-slow'; // Rain
        if (iconName.includes('11')) return 'animate-pulse'; // Thunderstorm
        if (iconName.includes('13')) return 'animate-spin-slow'; // Snow
        if (iconName.includes('50')) return 'animate-pulse-fast'; // Mist
        return '';
    };

    return (
        <div 
            {...rest} 
            className={cn(
                'relative flex flex-col items-center justify-center',
                className
            )}
        >
            <div className={cn(
                'relative transition-all duration-500 hover:scale-110',
                sizeClasses[size],
                getAnimationClass(iconName)
            )}>
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 to-blue-100/20 rounded-full blur-sm"></div>
                
                {/* Weather Icon */}
                <Image
                    width={100}
                    height={100}
                    alt={description || "weather icon"}
                    className="absolute h-full w-full object-contain drop-shadow-lg"
                    src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
                    priority={size === 'xl'}
                />
                
                {/* Interactive Overlay */}
                <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>

            {/* Weather Description */}
            {showDescription && description && (
                <p className="mt-2 text-xs text-gray-600 font-medium capitalize text-center max-w-[100px] leading-tight">
                    {description}
                </p>
            )}
        </div>
    );
}

// Additional Component for Animated Weather Background
export const WeatherBackground = ({ iconName }: { iconName: string }) => {
    const getBackgroundClass = (iconName: string) => {
        if (iconName.includes('01d')) return 'bg-gradient-to-br from-blue-400 to-cyan-300'; // Clear sky day
        if (iconName.includes('01n')) return 'bg-gradient-to-br from-blue-900 to-purple-800'; // Clear sky night
        if (iconName.includes('02') || iconName.includes('03')) 
            return 'bg-gradient-to-br from-blue-300 to-gray-200'; // Few clouds
        if (iconName.includes('04')) return 'bg-gradient-to-br from-gray-400 to-gray-300'; // Broken clouds
        if (iconName.includes('09') || iconName.includes('10')) 
            return 'bg-gradient-to-br from-gray-500 to-blue-400'; // Rain
        if (iconName.includes('11')) return 'bg-gradient-to-br from-purple-600 to-gray-700'; // Thunderstorm
        if (iconName.includes('13')) return 'bg-gradient-to-br from-blue-200 to-gray-100'; // Snow
        if (iconName.includes('50')) return 'bg-gradient-to-br from-gray-300 to-blue-200'; // Mist
        return 'bg-gradient-to-br from-blue-400 to-cyan-300'; // Default
    };

    return (
        <div className={`absolute inset-0 -z-10 transition-all duration-1000 ${getBackgroundClass(iconName)}`}>
            {/* Animated background elements based on weather */}
            {iconName.includes('01d') && (
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 to-transparent animate-pulse-slow"></div>
            )}
            {iconName.includes('09') || iconName.includes('10') && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300/30 to-transparent animate-pulse"></div>
            )}
        </div>
    );
};