import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

type Props = {};

export default function Footer({ }: Props) {
    const h1 = 'hello'
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* Branding */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white">WeatherWise</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Stay ahead with accurate weather updates
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                        <a
                            href="https://openweathermap.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            OpenWeather
                        </a>
                        <a
                            href="https://github.com/imjoyhalder"
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

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    
                    {/* Copyright */}
                    <div className="text-center md:text-left text-gray-500">
                        © {new Date().getFullYear()} WeatherWise. All rights reserved.
                    </div>

                    {/* Developer Info + Socials */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">Developed by <strong className="text-white">Joy Halder</strong></span>
                        <div className="flex space-x-4 text-lg">
                            <a
                                href="https://github.com/imjoyhalder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://leetcode.com/AB_JOY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                                aria-label="LeetCode"
                            >
                                <SiLeetcode />
                            </a>
                            <a
                                href="https://linkedin.com/in/joyhalder36" // Update with your LinkedIn
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://twitter.com/your-profile" // Update with your Twitter if available
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
