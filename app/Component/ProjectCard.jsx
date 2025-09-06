'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import useData from '../Stores/Data'

const ProjectCard = ({ project }) => {
  const theme = useData((s) => s.theme) // dark/light
  const isDark = theme === "dark"

  const { name, description, image, techstacks, github, live } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-xl group transition-all
        ${isDark 
          ? "bg-gradient-to-br from-white/5 via-white/10 to-white/5 border-white/20 shadow-indigo-500/20" 
          : "bg-gradient-to-br from-white/60 via-white/70 to-white/50 border-gray-200 shadow-indigo-300/20"}`}
    >
      {/* Crystal Shine Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-50" />

      {/* Project Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 relative z-10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {name}
        </h3>
        <p className={`text-sm leading-relaxed text-justify ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techstacks?.map((tech, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border 
                ${isDark 
                  ? "bg-white/10 border-white/20 text-gray-200" 
                  : "bg-white/40 border-gray-200 text-gray-800"}`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          {live && (
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm shadow-md backdrop-blur-lg transition-all
                ${isDark 
                  ? "bg-green-400/20 border border-green-400/30 text-green-300 hover:bg-green-400 hover:text-black" 
                  : "bg-green-500/30 border border-green-600/40 text-green-900 hover:bg-green-500 hover:text-white"}`}
            >
              <FaExternalLinkAlt /> Live
            </motion.a>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm shadow-md backdrop-blur-lg transition-all
                ${isDark 
                  ? "bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black" 
                  : "bg-gray-900/70 border border-gray-900 text-white hover:bg-gray-900"}`}
            >
              <FaGithub /> GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
