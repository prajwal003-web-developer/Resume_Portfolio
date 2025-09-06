'use client'
import React from 'react'
import { motion } from 'framer-motion'
import useData from '../Stores/Data'
import ProjectCard from '../Component/ProjectCard'

const ProjectsPage = () => {
  const data = useData(s => s.data)
  const projects = data.Projects || []
  const theme = useData(s => s.theme)
  const isLight = theme === 'light'

  return (
    <section
      id="projects-page"
      className={`py-24 pt-36 px-6 md:px-16 min-h-[100dvh] flex flex-col items-center justify-start gap-12 bg-gradient-to-b ${
        isLight ? 'from-black/40 via-white to-purple-50' : 'from-black via-gray-950 to-black'
      }`}
    >

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`w-full h-[60vh] p-12 rounded-3xl backdrop-blur-xl border border-white/20 ${
            isLight ? 'bg-white/20 text-gray-900' : 'bg-white/5 text-gray-200'
          } flex flex-col items-center justify-center shadow-xl`}
        >
          <p className="text-2xl md:text-3xl font-semibold text-center">
            No projects to show 🚧
          </p>
          <p className="mt-4 text-center text-gray-400">
            Please check back later or start adding your amazing projects!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-3xl backdrop-blur-xl hover:shadow-2xl transition-shadow"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

export default ProjectsPage
