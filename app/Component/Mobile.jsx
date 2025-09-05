"use client";

import React, { useEffect, useRef, useState } from "react";
import useData from "../Stores/Data";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCall, IoMdRadioButtonOff, IoMdReturnLeft } from "react-icons/io";
import { usePhoneStroe } from "../Stores/PhoneStore";
import MobHome from "./MobHome";
import MobNav from "./MobNav";
import MobDialPad from "./MobDialPad";

const Mobile = () => {
    const theme = useData((s) => s.theme);


    const isOpen = usePhoneStroe((s) => s.isPhoneOpen);
    const setIsOpen = usePhoneStroe((s) => s.setIsPhoneOpen);

    const isNavbarOpen = usePhoneStroe((s)=>s.isNavbarOpen)
    const isCallOpen = usePhoneStroe(s=>s.isCallOpen)

    const setIsCallOpen = usePhoneStroe((s) => s.setIsCallOpen);
    const setIsNavbarOpen = usePhoneStroe((s) => s.setIsNavbarOpen);





    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chatbox"
                        initial={{ opacity: 0, x: -200, y: 200, scale: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -200, y: 200, scale: 0 }}
                        transition={{ duration: 0.7 }}
                        className={`fixed flex flex-col z-30 bottom-6 left-8 p-1 px-4 rounded-4xl overflow-clip
              w-[87vw] h-[35rem] md:w-[30rem] shadow 
              ${theme === "light" ? "bg-gray-200 shadow-gray-600" : "bg-[#0c0c0c] shadow-gray-900"}`}
                    >
                        {/* Header */}
                        <div className={`h-14 flex justify-center items-center gap-3 font-extrabold`}>
                            <div className="h-3 w-4 bg-black rounded-full flex justify-center items-center text-gray-500">
                                •
                            </div>
                            XAMXUNG
                            <div className="w-16 h-3 rounded-2xl bg-gray-950">

                            </div>
                        </div>

                        {/* Body*/}
                        <div
                            className={`flex-1 overflow-y-auto noScrollBar  shadow-inner 
                ${theme === "light" ? "bg-gray-300" : "bg-[#ffffff16]"}`}
                        >

                            {/* Home Open Page  */}

                            { !isNavbarOpen && !isCallOpen &&
                                <MobHome/>

                            }

                             { isNavbarOpen && !isCallOpen &&
                                <MobNav/>

                            }
                              { !isNavbarOpen && isCallOpen &&
                                <MobDialPad/>

                            }


                        </div>

                        {/* Input  */}
                        <div className="h-14 flex justify-around items-center py-6">
                            <button onClick={() => {
                                setIsCallOpen(true)
                            }} className="w-20 shadow h-7 text-green-700 shadow-gray-700 cursor-pointer rounded active:shadow-none flex justify-center items-center">
                                <IoMdCall />
                            </button>
                            <button onClick={() => {
                                setIsNavbarOpen(false)
                                setIsCallOpen(false)
                                setIsOpen(false)
                            }} className="w-28 shadow h-5 shadow-gray-700 cursor-pointer text-red-700 rounded active:shadow-none flex justify-center items-center">
                                <IoMdRadioButtonOff />
                            </button>
                            <button onClick={() => {
                                setIsCallOpen(false)
                                setIsNavbarOpen(false)
                            }} className="w-20 shadow h-7 text-blue-700 shadow-gray-700 cursor-pointer rounded active:shadow-none flex justify-center items-center">
                                <IoMdReturnLeft />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* Floating Button */}
                {!isOpen && (

                    <motion.button
                        key={"ChatButton"}
                        initial={{
                            opacity: 0,
                            scale: 0
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        exit={{
                            opacity: [1, 0],
                            scale: [1, 0]
                        }}
                        transition={{
                            duration: .9
                        }}
                        onClick={() => setIsOpen(true)}
                        className={`fixed bottom-6 left-8 z-30 h-11 w-11 rounded-full cursor-pointer shadow flex justify-center items-center active:shadow-none ${theme === "light"
                            ? "bg-gray-300 shadow-gray-500"
                            : "bg-[#d5d0d0] shadow-gray-100"
                            }`}
                    >
                        <img src="/Phone.png" alt="Error" className="h-10 w-10" />
                    </motion.button>

                )}
            </AnimatePresence>
        </>
    );
};

export default Mobile;
