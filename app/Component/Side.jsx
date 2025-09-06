"use client";

import React from "react";
import useData from "../Stores/Data";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaMailBulk,
} from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { usePhoneStroe } from "../Stores/PhoneStore";
import { useAiStore } from "../Stores/AiStore";



const Side = () => {
    const theme = useData((s) => s.theme);
    const isDark = theme === "dark";

    const data = useData(s => s.data)



    const socials = [
        { id: "instagram", icon: <FaInstagram />, url: data?.Information?.instagram || "#" },
        { id: "email", icon: <FaMailBulk />, url: "mailto:" + data?.Information?.email || "#" },
        { id: "facebook", icon: <FaFacebook />, url: data?.Information?.facebook || "https://facebook.com" },
        { id: "twitter", icon: <FaTwitter />, url: data?.Information?.twitter || "https://twitter.com" },
        { id: "linkedin", icon: <FaLinkedin />, url: data?.Information?.linkedin || "https://linkedin.com" },
        { id: "github", icon: <FaGithub />, url: data?.Information?.github || "https://github.com" },
        { id: "resume", icon: <FaFilePdf />, url: data?.Information?.resume || "/resume.pdf" },
    ];

    const ClosePhone = usePhoneStroe(s=>s.ClosePhone)
    const setIsPhoneOpen = usePhoneStroe(s=>s.setIsPhoneOpen)
    const setIsHomePage = usePhoneStroe(s=>s.setIsHomePage)
    const setIsAiOpen  = useAiStore(s=>s.setIsOpen)

    return (
        <>
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0, transition: { delay: 1, duration: 1 } }}
                className={`fixed top-[47%] group -left-2 h-12 w-6 hidden md:block cursor-pointer 
        hover:top-[30%] transition-discrete duration-700 
        z-30
        hover:h-72 hover:w-[7rem] shadow 
        ${isDark ? "bg-[#272525] shadow-gray-900" : "bg-gray-300"}  
        rounded-xl overflow-hidden`}
            >
                {/* icons container */}
                <motion.div
                    className="justify-center items-center w-full h-full flex-col gap-4 hidden group-hover:flex delay-700"
                    initial={{ opacity: 0, y: -400 }}
                    animate={{ opacity: 1, y: 0, }}
                    transition={{
                        delay: .8,
                        duration: .3
                    }}

                // Why Not Working this animation 
                >
                    <AnimatePresence>
                        {socials.map((item, idx) => (
                            <motion.a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.id}
                                initial={{ opacity: 0, x: -200 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.3, delay: 0.7 + idx * 0.15 },
                                }}
                                exit={{ opacity: 0, x: -100 }}
                                whileHover={{ scale: 1.25, rotate: 8 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`text-2xl transition-colors ${isDark
                                    ? "text-gray-200 hover:text-blue-400"
                                    : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            <motion.div
                onClick={()=>{
                    ClosePhone()
                    setIsAiOpen(false)
                    setIsPhoneOpen(true)
                    setIsHomePage(false)
                }}
                initial={{ x: -100 }}
                animate={{ x: 0, transition: { delay: 1, duration: 1 } }}
                className={`fixed top-[47%] group -left-2 h-12 w-6 md:hidden block cursor-pointer z-30 shadow 
        ${isDark ? "bg-[#272525] shadow-gray-900" : "bg-gray-300"}  
        rounded-xl overflow-hidden`}>

            </motion.div>
        </>
    );
};

export default Side;
