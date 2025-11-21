'use client';

import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
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
import { useEffect } from "react";
import ErrorDisplay from "./components/ErrorDisplay";
import HeroBanner from "./components/HeroBanner";
import Container from "./components/Container";
import LoadingSpinner from "./components/LoadingSpinner";

export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: CityData;
}

export default function Home() {
  const [place] = useAtom(placeAtom);
  const [, setLoading] = useAtom(loadingAtom);

  const { isPending, error, data, refetch } = useQuery<ForecastApiResponse>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        return data;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    retry: 1,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (place) {
      refetch();
    }
  }, [place]); // Removed refetch from dependencies

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to fetch weather data"
          : "An unexpected error occurred"
        }
        onRetry={() => refetch()}
      />
    );
  }

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
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2060&q=80')] bg-cover bg-center bg-fixed opacity-5"></div>

      <div className="relative z-10">
        <Navbar />

        <HeroBanner data={data} place={place} />

        <main className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">

          {/* Today's Detailed Forecast */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Today's Forecast</h2>
            </div>

            {/* Hourly Forecast */}
            <Container className="weather-card-bg border-none backdrop-blur-sm">
              <div className="flex gap-8 sm:gap-12 overflow-x-auto py-4 px-2 justify-between">
                {data.list.slice(0, 8).map((d: WeatherForecast, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-3 items-center text-sm font-semibold min-w-[80px] transition-all duration-300 hover:scale-110"
                  >
                    <p className="text-gray-600 whitespace-nowrap">
                      {format(parseISO(d.dt_txt), 'h a')}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                      className="w-12 h-12"
                    />
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">
                        {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                      </p>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        {d.weather[0].description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>

            {/* Today's Weather Details */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Current Conditions Card */}
              <Container className="weather-card-bg border-none backdrop-blur-sm p-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-4">Current Conditions</p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(firstData?.weather[0]?.icon ?? '01d', firstData?.dt_txt ?? '')}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <p className="text-xl font-bold text-gray-800 capitalize">
                    {firstData?.weather[0]?.description || "Clear sky"}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">High</p>
                      <p className="font-bold text-red-500">
                        {convertKelvinToCelsius(firstData?.main?.temp_max ?? 0)}°
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Low</p>
                      <p className="font-bold text-blue-500">
                        {convertKelvinToCelsius(firstData?.main?.temp_min ?? 0)}°
                      </p>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Weather Details Card */}
              <Container className="weather-card-bg border-none backdrop-blur-sm p-6">
                <WeatherDetails
                  visibility={metersToKilometers(visibility)}
                  airPressure={`${pressure} hPa`}
                  humidity={`${humidity}%`}
                  sunrise={format(fromUnixTime(sunrise), 'h:mm a')}
                  sunset={format(fromUnixTime(sunset), 'h:mm a')}
                  windSpeed={convertWindSpeed(windSpeed)}
                />
              </Container>
            </div>
          </section>

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