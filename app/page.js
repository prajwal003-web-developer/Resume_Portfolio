import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Skills from './Pages/Skills'
import Project from './Pages/Project'
import Footer from './Pages/Footer'

const page = () => {
  return (
    <div>
      <Home/>
      <About/>
      <Skills/>
      <Project/>
      <Footer/>
    </div>
  )
}

export default page