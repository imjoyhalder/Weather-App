// page.tsx - Updated API call
'use client';

import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "./components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { WeatherDetails } from "./components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { ForecastWeatherDetails } from "./components/ForecastWeatherDetails";
import Footer from "./components/Footer";
import { useAtom } from "jotai";
import { loadingAtom, placeAtom } from "./atom";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";
import HeroBanner from "./components/HeroBanner";

// ... your existing interfaces

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [apiError, setApiError] = useState<string | null>(null);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      setLoading(true);
      setApiError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        // API response validation
        if (response.data.cod !== "200") {
          throw new Error(response.data.message || "API Error");
        }

        if (!response.data.list || !response.data.city) {
          throw new Error("Invalid data format from API");
        }

        return response.data;
      } catch (err: any) {
        console.error("API Error:", err);
        if (err.response?.data?.message) {
          setApiError(err.response.data.message);
        } else if (err.message) {
          setApiError(err.message);
        } else {
          setApiError("Failed to fetch weather data");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (place) {
      refetch();
    }
  }, [place]);

  // Debug data
  useEffect(() => {
    if (data) {
      console.log("API Response:", data);
      console.log("First Data:", data?.list[0]);
      console.log("City Data:", data?.city);
    }
  }, [data]);

  if (isPending || loading) {
    return <LoadingSpinner />;
  }

  if (error || apiError) {
    return (
      <ErrorDisplay
        message={apiError || "Failed to fetch weather data"}
        onRetry={() => refetch()}
      />
    );
  }

  // Data validation
  if (!data?.list || data.list.length === 0) {
    return (
      <ErrorDisplay
        message="No weather data available for this location"
        onRetry={() => refetch()}
      />
    );
  }

  const firstData = data.list[0];
  const cityData = data.city;

  // Safe data access with fallbacks
  const currentTemp = firstData?.main?.temp ?? 0;
  const feelsLike = firstData?.main?.feels_like ?? 0;
  const visibility = firstData?.visibility ?? 10000;
  const humidity = firstData?.main?.humidity ?? 0;
  const windSpeed = firstData?.wind?.speed ?? 0;
  const pressure = firstData?.main?.pressure ?? 0;
  const sunrise = cityData?.sunrise ?? 0;
  const sunset = cityData?.sunset ?? 0;

  const uniqueDates = [
    ...new Set(
      data.list.map(
        (entry: WeatherForecast) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data.list.find((entry: WeatherForecast) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  }).filter(Boolean); // Remove undefined values

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2060&q=80')] bg-cover bg-center bg-fixed opacity-5"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Banner Section */}
        <HeroBanner data={data} place={place} />

        <main className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">

          {/* Today's Weather Details - 2 Column Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Current Conditions Card */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                {/* Left Section - Main Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Current Weather
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <WeatherIcon
                      iconName={getDayOrNightIcon(firstData?.weather[0]?.icon ?? '01d', firstData?.dt_txt ?? '')}
                      className="w-16 h-16"
                    />
                    <div>
                      <p className="text-3xl font-bold text-gray-800">
                        {convertKelvinToCelsius(firstData?.main?.temp ?? 0)}°
                      </p>
                      <p className="text-gray-600 capitalize">
                        {firstData?.weather[0]?.description || "Clear sky"}
                      </p>
                    </div>
                  </div>

                  {/* Temperature Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-red-600 font-medium mb-1">High</p>
                      <p className="text-xl font-bold text-red-700">
                        {convertKelvinToCelsius(firstData?.main?.temp_max ?? 0)}°
                      </p>
                    </div>
                    <div className="text-center bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium mb-1">Low</p>
                      <p className="text-xl font-bold text-blue-700">
                        {convertKelvinToCelsius(firstData?.main?.temp_min ?? 0)}°
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Additional Info */}
                <div className="text-right">
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-600">Feels like</p>
                    <p className="text-lg font-bold text-gray-800">
                      {convertKelvinToCelsius(firstData?.main?.feels_like ?? 0)}°
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated: {format(new Date(), 'h:mm a')}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Metrics Card - 2 Column Grid */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Weather Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="space-y-4">
                  {/* Visibility */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Visibility</p>
                        <p className="text-lg font-bold text-gray-800">{metersToKilometers(visibility)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Humidity</p>
                        <p className="text-lg font-bold text-gray-800">{humidity}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Sunrise */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Sunrise</p>
                        <p className="text-lg font-bold text-gray-800">{format(fromUnixTime(sunrise), 'h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  {/* Air Pressure */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Pressure</p>
                        <p className="text-lg font-bold text-gray-800">{pressure} hPa</p>
                      </div>
                    </div>
                  </div>

                  {/* Wind Speed */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Wind Speed</p>
                        <p className="text-lg font-bold text-gray-800">{convertWindSpeed(windSpeed)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Sunset</p>
                        <p className="text-lg font-bold text-gray-800">{format(fromUnixTime(sunset), 'h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                7-Day Forecast
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {firstDataForEachDate.slice(0, 7).map((d, i) => {
                if (!d) return null;

                return (
                  <ForecastWeatherDetails
                    key={i}
                    description={d?.weather[0]?.description ?? "Clear sky"}
                    weatherIcon={d?.weather[0]?.icon ?? "01d"}
                    date={format(parseISO(d?.dt_txt ?? ""), "MMM dd")}
                    day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                    feels_like={d?.main?.feels_like ?? 0}
                    temp={d?.main?.temp ?? 0}
                    temp_max={d?.main?.temp_max ?? 0}
                    temp_min={d?.main?.temp_min ?? 0}
                    airPressure={`${d?.main?.pressure ?? 0} hPa`}
                    humidity={`${d?.main?.humidity ?? 0}%`}
                    sunrise={format(fromUnixTime(sunrise), "h:mm a")}
                    sunset={format(fromUnixTime(sunset), "h:mm a")}
                    visibility={`${metersToKilometers(d?.visibility ?? 10000)}`}
                    windSpeed={`${convertWindSpeed(d?.wind?.speed ?? 0)}`}
                    isToday={i === 0}
                  />
                );
              })}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}