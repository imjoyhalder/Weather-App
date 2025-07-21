import React from 'react'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Branding */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-semibold text-white">WeatherWise</h1>
                        <p className="text-sm text-gray-400 mt-1">Stay ahead with accurate weather updates</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 text-sm">
                        <a
                            href="https://openweathermap.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            OpenWeather
                        </a>
                        <a
                            href="https://github.com/your-github-profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            GitHub
                        </a>
                        <a
                            href="/privacy"
                            className="hover:text-white transition"
                        >
                            Privacy
                        </a>
                        <a
                            href="/terms"
                            className="hover:text-white transition"
                        >
                            Terms
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6" />

                {/* Copyright */}
                <div className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} WeatherWise. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
