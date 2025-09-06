'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../Component/ProjectCard'
import { useRouter } from 'next/navigation'
import useData from '../Stores/Data'

const Project = () => {
  const router = useRouter()
  const data = useData(s => s.data)
  const projects = data.Projects.filter(itm=>itm.isspecial) || []
  const theme = useData(s => s.theme)
  const isLight = theme === 'light'

  return (
    <section
      id="project"
      className={`relative min-h-[100dvh] max-w-[100vw] overflow-clip flex flex-col items-center justify-center px-6 md:px-16 py-20 bg-gradient-to-b ${isLight ? 'from-indigo-50 via-white to-purple-50' : 'from-black via-gray-950 to-black'}`}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/30 blur-3xl -z-10" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold mb-16 text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
      >
        Projects
      </motion.h2>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`w-full  p-12 h-[60vh] rounded-3xl backdrop-blur-xl border  ${isLight ? 'bg-white/20 border-black/15 text-gray-900' : 'bg-white/5 text-gray-200 border-white/20'} flex flex-col items-center justify-center shadow-xl`}
        >
          <p className="text-2xl md:text-3xl font-semibold w-full text-center">
            No projects to show 🚧
          </p>
          <p className="mt-4 text-center text-gray-400">
            Please check back later!!  i will be adding my amazing projects!
          </p>
        </motion.div>
      ) : (
        <>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>

          {/* View All Projects Button */}
          <motion.button
            onClick={() => router.push("/projects")}
            whileTap={{ scale: 0.95 }}
            className={`mt-16 px-8 py-3 rounded-full font-semibold shadow-xl backdrop-blur-md bg-gradient-to-r ${isLight ? 'from-black/60 to-gray-800/50 text-white' : 'from-white/20 to-gray-500/20 text-white'}`}
          >
            View All Projects
          </motion.button>
        </>
      )}
    </section>
  )
}

export default Project
