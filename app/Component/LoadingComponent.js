"use client"; // ⬅️ make sure it's a client component

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useData from "../Stores/Data";

const LoadingComponent = () => {
  const [theme, setTheme] = useState("light"); // default

    const Text = 'PRAJWAL'

    const setIsAnimated = useData(s=>s.setIsAnimated)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    setTimeout(()=>{
        setIsAnimated()
    },Text.length*409)
  }, []);



  return (
    <div
      className={`${
        theme !== "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      } flex justify-center items-center h-[100vh] max-w-[100vw] overflow-hidden`}
    >

        {
            Array.from({length:Text.length}).map((_,idx)=>{
                return (
                   < motion.div key={idx}  
                   className={`${theme!=='dark'?'bg-white text-black':'bg-black text-white'} h-[100vh] flex-1 flex justify-center items-center font-extrabold text-xl md:text-2xl`}

                   initial={{
                    x:0,
                    y:-1000,
                   }}

                   animate={{
                    y:0
                   }}
                   transition={{ duration: 0.4, delay:idx*.4 , ease: "easeOut" }}
                   
                   >
                   {Text[idx]}
                   </motion.div>
                )
            })
        }
      
    </div>
  );
};

export default LoadingComponent;
