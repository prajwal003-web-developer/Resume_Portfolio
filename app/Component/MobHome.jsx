"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link";
import useData from "../Stores/Data";
import { usePhoneStroe } from "../Stores/PhoneStore";

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

    const data = useData((s)=>s.data)

    const setIsNavbarOpen = usePhoneStroe((s) => s.setIsNavbarOpen);

    return (
        <div className="flex flex-col items-center justify-center h-[100%] w-full bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white">
            <div className="flex-1 flex justify-center items-center">
                <div className="backdrop-blur-md bg-white/10 border  border-white/20 rounded-2xl shadow-xl p-6 flex flex-col items-center space-y-2">
                    {/* Time */}
                    <h1 className="text-5xl font-bold tracking-wide drop-shadow-lg">
                        {timeData.time}
                    </h1>
                    {/* Date */}
                    <p className="text-lg font-medium text-gray-200 drop-shadow-md">
                        {timeData.date}
                    </p>
                </div>
            </div>
            <div className="flex justify-around gap-12 items-center p-1 py-3 ">
                <Link href={`https://wa.me/+${data?.Information.whatsapp}`} target="_blank" className="cursor-pointer">
                    <FaWhatsapp size={'3rem'} className="bg-green-500 rounded p-2 "/>
                </Link>
                <button onClick={()=>{
                    setIsNavbarOpen(true)
                }} className="cursor-pointer">
                    <CgMenuGridO  size={'3rem'} />
                </button>
            </div>

        </div>
    );
};

export default MobHome;
