'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import useData from '../Stores/Data'

const About = () => {
  const theme = useData((s) => s.theme) // light / dark
  const data = useData((s) => s.data)

  const aboutText =
    data?.Information?.about ||
    "I am a passionate developer who loves building modern, user-friendly web applications."
  const aboutImage =
    data?.Information?.aboutimage || "https://via.placeholder.com/400"
  const socials = {
    linkedin: data?.Information?.linkedin || "#",
    twitter: data?.Information?.twitter || "#",
    facebook: data?.Information?.facebook || "#",
  }

  const isDark = theme === "dark"

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section
      id="about"
      className={`relative min-h-[100dvh] flex items-center justify-center px-6 md:px-16 py-16 bg-gradient-to-b ${!isDark?"from-white to-white via-gray-300 text-black ":"from-black via-gray-900 to-black text-gray-100"}`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Profile Image */}
        <motion.div
          variants={item}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-lg">
            <motion.img
              src={aboutImage}
              alt="About"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-indigo-500 blur-3xl -z-10"
          />
        </motion.div>

        {/* About Content */}
        <motion.div
          variants={item}
          viewport={{ once: true }}
          className="flex flex-col space-y-6"
        >
          <motion.h2
            variants={item}
            viewport={{ once: true }}
            className={"text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-460 bg-clip-text text-transparent"}
          >
            About Me
          </motion.h2>
          <motion.p
            variants={item}
            viewport={{ once: true }}
            className={` text-lg leading-relaxed text-justify ${isDark?"text-gray-200":"text-black"}`}
          >
            {aboutText}
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={item}
            viewport={{ once: true }}
            className="flex gap-6 mt-4"
          >
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-indigo-500/40 
              ${isDark
                ? "bg-white/10 border-white/20 text-indigo-300"
                : "bg-white/40 border-white/60 text-indigo-700"}`}
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-blue-400/40 
              ${isDark
                ? "bg-white/10 border-white/20 text-blue-300"
                : "bg-white/40 border-white/60 text-blue-700"}`}
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-blue-600/40 
              ${isDark
                ? "bg-white/10 border-white/20 text-blue-400"
                : "bg-white/40 border-white/60 text-blue-800"}`}
            >
              <FaFacebook size={24} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
