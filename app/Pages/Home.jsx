'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import useData from '../Stores/Data'

const Home = () => {
  const data = useData((s) => s.data)
  const theme = useData((s) => s.theme)

  const name = data?.Information?.name || "Prajwal"
  const role = data?.Information?.title || "FullStack Web Developer"
  const homeImage = data?.Information?.homeimage || "#"

  const isDark = theme === "dark"

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex justify-center items-center overflow-hidden font-['Inter']"
    >
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={homeImage}
        alt="Home Background"
        className="absolute inset-0 h-full w-full object-cover object-center z-0"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-[#00000078] z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        {/* Glass effect wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl px-6 md:px-12 py-8 md:py-14"
        >
          {/* Intro text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="text-3xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-white bg-clip-text text-transparent drop-shadow-lg"
          >
            Hello, I Am {name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl mt-3 text-gray-300"
          >
            {role}
          </motion.h2>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-8 flex gap-6 justify-center"
          >
            {/* Projects Button */}
            <Link href="#project">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 md:px-8 py-3 text-xs md:text-base font-semibold rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-500 shadow-lg group
                ${isDark
                  ? "bg-white/10 border-white/20 text-indigo-300"
                  : "bg-white/40 border-white/60 text-indigo-700"
                }`}
              >
                <span className="relative z-10">View Projects</span>
                {/* Hover Sweep Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </Link>

            {/* Contact Button */}
            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 md:px-8 py-3 text-xs md:text-base font-semibold rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-500 shadow-lg group
                ${isDark
                  ? "bg-purple-400/20 border-purple-500/40 text-gray-200"
                  : "bg-purple-500/30 border-purple-600/40 text-gray-900"
                }`}
              >
                <span className="relative z-10">Contact Me</span>
                {/* Neon Hover Glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500 blur-3xl z-0"
      />
    </section>
  )
}

export default Home
