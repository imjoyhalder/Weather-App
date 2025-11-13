import React from "react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaMapMarkerAlt,
    FaEnvelope,
    FaHeart,
    FaCloudSun,
    FaShieldAlt,
    FaFileContract,
} from "react-icons/fa";
import { SiLeetcode, SiOpenstreetmap } from "react-icons/si"; // ✅ fixed icon import
import { IoLocationSharp, IoMailSharp, IoHeartSharp } from "react-icons/io5";

type Props = {};

export default function Footer({ }: Props) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        {
            name: "OpenWeather",
            href: "https://openweathermap.org/",
            icon: <SiOpenstreetmap className="text-orange-500" />, // ✅ replaced icon
        },
        {
            name: "GitHub",
            href: "https://github.com/imjoyhalder",
            icon: <FaGithub className="text-gray-400" />,
        },
        {
            name: "Privacy",
            href: "/privacy",
            icon: <FaShieldAlt className="text-blue-400" />,
        },
        {
            name: "Terms",
            href: "/terms",
            icon: <FaFileContract className="text-green-400" />,
        },
    ];

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/imjoyhalder",
            icon: FaGithub,
            color: "hover:text-gray-300",
        },
        {
            name: "LeetCode",
            href: "https://leetcode.com/AB_JOY",
            icon: SiLeetcode,
            color: "hover:text-yellow-400",
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/joyhalder36",
            icon: FaLinkedin,
            color: "hover:text-blue-400",
        },
        {
            name: "Twitter",
            href: "https://twitter.com/your-profile",
            icon: FaTwitter,
            color: "hover:text-sky-400",
        },
    ];

    const developerInfo = {
        name: "Joy Halder",
        location: "Bangladesh",
        email: "joyhalder001155@gmail.com",
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 mix-blend-overlay"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <FaCloudSun className="text-4xl text-cyan-400" />
                                <div className="absolute inset-0 text-cyan-400 blur-sm">
                                    <FaCloudSun className="text-4xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                    WeatherWise
                                </h1>
                                <p className="text-sm text-gray-400 mt-1">
                                    Accurate weather insights for Bangladesh
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                            Providing real-time weather updates, forecasts, and climate data
                            specifically optimized for Bangladesh regions. Stay informed with
                            precise meteorological insights.
                        </p>

                        {/* Developer Contact */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <IoLocationSharp className="text-rose-500 text-lg" />
                                <span>Based in {developerInfo.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <IoMailSharp className="text-cyan-400 text-lg" />
                                <a
                                    href={`mailto:${developerInfo.email}`}
                                    className="hover:text-cyan-400 transition-colors"
                                >
                                    {developerInfo.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-cyan-400" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target={
                                            link.href.startsWith("http") ? "_blank" : "_self"
                                        }
                                        rel={
                                            link.href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-all duration-300 group py-1"
                                    >
                                        <span className="text-lg transition-transform group-hover:scale-110">
                                            {link.icon}
                                        </span>
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {link.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <IoHeartSharp className="text-rose-500" />
                            Let's Connect
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Follow for updates, contributions, and collaborations
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-600/30 text-xl transition-all duration-300 hover:scale-110 hover:border-cyan-400/30 ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700/50 my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-gray-500 text-center lg:text-left">
                        <span>© {currentYear} WeatherWise BD. All rights reserved.</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                            Crafted with{" "}
                            <IoHeartSharp className="text-rose-500 animate-pulse" /> in
                            Bangladesh
                        </span>
                    </div>

                    {/* Developer Credit */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 hidden md:block">
                            Developed by{" "}
                            <strong className="text-white bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                                {developerInfo.name}
                            </strong>
                        </span>

                        {/* Mobile Social Links */}
                        <div className="flex gap-3 text-lg md:hidden">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-gray-500 text-xs text-center lg:text-right">
                        <p>Data provided by OpenWeatherMap</p>
                        <p className="mt-1">Built with Next.js & Tailwind CSS</p>
                    </div>
                </div>

                {/* Watermark */}
                <div className="absolute bottom-2 right-4 text-gray-600 text-xs">
                    v1.0.0
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>
        </footer>
    );
}
