"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useData from "../Stores/Data";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { usePhoneStroe } from "../Stores/PhoneStore";
import { CgMenuGridO } from "react-icons/cg";
import { useAiStore } from "../Stores/AiStore";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const theme = useData(s => s.theme); // "light" | "dark"

  const [activeSection, setActiveSection] = useState('home')

  const setTheme = useData(s => s.setTheme)

  const setIsOpen = usePhoneStroe((s) => s.setIsPhoneOpen);
  const setIsCallOpen = usePhoneStroe((s) => s.setIsCallOpen);
  const setIsNavbarOpen = usePhoneStroe((s) => s.setIsNavbarOpen);

  const setIsAiOpen  = useAiStore(s=>s.setIsOpen)

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);



  const isDark = theme === "dark";

  const name = "PRAJWAL.DEV"

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "project", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={` ${isDark ? "bg-black text-white shadow-gray-900" : "bg-white shadow-gray-300 text-black"} transition-colors duration-500   h-16 md:h-20 fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-12 shadow z-20`}>
      <Link href={'/'} className="headFont select-none cursor-pointer md:text-4xl font-semibold flex flex-row">
        {
          name.split('').map((itm, idx) => {
            return (
              <motion.p animate={{
                y: [-1000, 0],

                transition: {
                  duration: .2,
                  delay: .1 * idx
                }
              }} key={idx}>
                {itm}
              </motion.p>
            )
          })
        }
      </Link>
      <div className="flex justify-center items-center gap-3">
        <motion.div className={`hidden overflow-clip  group md:flex justify-center items-center rounded-xl shadow-inner  gap-1 py-1 px-2 ${theme == 'light' ? 'bg-gray-200 shadow-gray-400' : "bg-[#ffffff07] shadow-gray-500 shadow-2xl"} `}>
          {
            navLinks.map((itm, idx) => {
              return (
                <motion.span animate={{
                  x: [500, 0],

                  transition: {
                    duration: .3,
                    delay: .25 * idx
                  }
                }} className={`mono ${theme == 'light' ? 'hover:bg-gray-300' : 'hover:bg-[#ffffff0c]'}   rounded-2xl  ${activeSection == itm.id ? theme == 'light' ? "bg-gray-400 shadow shadow-gray-900 " : "shadow-inner shadow-gray-500 bg-[#ffffff25]" : ''} `} key={itm.id}>
                  <Link href={`#${itm.id}`} className=" px-4">
                    {itm.label}
                  </Link>
                </motion.span>
              )
            })
          }
        </motion.div>
        <motion.button
          animate={{
            y: [-400, 0],
            opacity: [.1, 1],
            transition: {
              duration: .7
            }
          }}
          onClick={() => {
            setIsOpen(true)
            setIsAiOpen(false)
            setIsCallOpen(false)
            setIsNavbarOpen(true)
          }} className="md:hidden block ">
          <CgMenuGridO size={'1.5rem'} />
        </motion.button>

        <button onClick={() => {
          if (theme == 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
          } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
          }
        }} className={`${theme == 'light' ? 'bg-gray-300 shadow-gray-400 ' : "bg-[#ffffff23] flex-row-reverse shadow-gray-600 "} h-7 px-2 py-1 w-16 rounded-xl transition-all duration-700 flex justify-between items-center cursor-pointer shadow-inner `}>
          <div className={`${theme == 'light' ? 'bg-gray-600 shadow-gray-200  shadow-inner text-lg' : " bg-gray-900 shadow-gray-100 shadow-inner"} h-6 w-6 transition duration-700 rounded-full `}>

          </div>
          {
            theme == 'light' ?
              <MdLightMode size={'1.2rem'} className="text-green-500 " /> :
              <MdDarkMode size={'1.2rem'} className="text-green-500" />
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

//  onClick={()=>{
//             if(theme=='light'){
//               setTheme('dark')
//               localStorage.setItem('theme','dark')
//             }else{
//               setTheme('light')
//               localStorage.setItem('theme','light')
//             }
//           }}