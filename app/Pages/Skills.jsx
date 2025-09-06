'use client'
import React from 'react'
import { motion } from 'framer-motion'
import useData from '../Stores/Data'

const Skills = () => {
  const theme = useData((s) => s.theme) // light / dark
  const data = useData((s) => s.data)

  const skills = data?.Information?.skills || [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
  ]

  const isDark = theme === "dark"

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section
      id="skills"
      className={`relative min-h-[100dvh] flex items-center justify-center px-6 md:px-16 py-20 bg-gradient-to-b max-w-[100vw] overflow-clip
        ${isDark 
          ? "from-black via-gray-900 to-black text-gray-100" 
          : "from-white via-gray-200 to-white text-gray-900"}`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl w-full flex flex-col items-center"
      >
        {/* Title */}
        <motion.h2
          variants={item}
          className="text-3xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent"
        >
          Skills
        </motion.h2>

        {/* Skill Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-2xl text-center font-semibold text-lg shadow-lg cursor-pointer transition-all
                ${isDark
                  ? "bg-white/10 border border-white/20 text-gray-200 hover:shadow-indigo-500/40"
                  : "bg-white/60 border border-gray-300 text-gray-900 hover:shadow-indigo-400/40"}`}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-500 blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-500 blur-3xl -z-10"
      />
    </section>
  )
}

export default Skills
