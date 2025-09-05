"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import useData from "../Stores/Data";
import { usePhoneStroe } from "../Stores/PhoneStore";
import { AnimatePresence, motion } from "framer-motion";
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaMailBulk,
} from "react-icons/fa";

import { FaFilePdf } from "react-icons/fa6";

const MobHome = () => {
    const [timeData, setTimeData] = useState({
        time: "",
        date: "",
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            // Format time
            const timeString = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            // Format date -> Fri, Aug-21 2025
            const dateString = now.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
            }).replace(",", "").replace(" ", "-");

            setTimeData({ time: timeString, date: dateString });
        };

        updateTime(); // run once
        const interval = setInterval(updateTime, 1000); // update every second

        return () => clearInterval(interval);
    }, []);

    const data = useData((s) => s.data)

    const setIsNavbarOpen = usePhoneStroe((s) => s.setIsNavbarOpen);

    const isHome = usePhoneStroe((s) => s.isHomePage)

    const setIsHomePage = usePhoneStroe(s => s.setIsHomePage)



    const socials = [
        { id: "instagram", icon: <FaInstagram />, url: data?.Information?.instagram || "#" },
        { id: "email", icon: <FaMailBulk />, url: "mailto:" + data?.Information?.email || "#" },
        { id: "facebook", icon: <FaFacebook />, url: data?.Information?.facebook || "https://facebook.com" },
        { id: "twitter", icon: <FaTwitter />, url: data?.Information?.twitter || "https://twitter.com" },
        { id: "linkedin", icon: <FaLinkedin />, url: data?.Information?.linkedin || "https://linkedin.com" },
        { id: "github", icon: <FaGithub />, url: data?.Information?.github || "https://github.com" },
        { id: "resume", icon: <FaFilePdf />, url: data?.Information?.resume || "/resume.pdf" },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-[100%] w-full bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white">
            <AnimatePresence mode="wait">
                {isHome ? (
                    <motion.div
                        key="home"
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col items-center space-y-2">
                            <h1 className="text-5xl font-bold tracking-wide drop-shadow-lg">{timeData.time}</h1>
                            <p className="text-lg font-medium text-gray-200 drop-shadow-md">{timeData.date}</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="other"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 200, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 flex flex-col justify-center items-center w-full px-4"
                    >

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                            {socials.map((item, idx) => (
                                <motion.a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col justify-center items-center text-center gap-2 cursor-pointer"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <div className="text-4xl p-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm">{item.id}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
            <div className="flex justify-center items-center gap-2 pb-2">
                <button onClick={() => {
                    setIsHomePage(true)
                }} className="p-2 cursor-pointer">
                    <GoDotFill size={'1.3rem'} className={`${!isHome ? "text-gray-500" : "text-white"}`} />
                </button>
                <button onClick={() => {
                    setIsHomePage(false)
                }} className="p-2 cursor-pointer">
                    <GoDotFill size={'1.3rem'} className={`${isHome ? "text-gray-500" : "text-white"}`} />
                </button>
            </div>
            <div className="flex justify-around gap-12 items-center p-1 py-3 ">
                <Link href={`https://wa.me/+${data?.Information.whatsapp}`} target="_blank" className="cursor-pointer">
                    <FaWhatsapp size={'3rem'} className="bg-green-500 rounded p-2 " />
                </Link>
                <button onClick={() => {
                    setIsNavbarOpen(true)
                }} className="cursor-pointer">
                    <CgMenuGridO size={'3rem'} />
                </button>
            </div>

        </div>
    );
};

export default MobHome;
