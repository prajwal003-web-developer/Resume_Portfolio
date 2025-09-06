'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useData from '../Stores/Data'
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
} from 'react-icons/fa'

const Footer = () => {
  const theme = useData((s) => s.theme)
  const data = useData((s) => s.data)
  const isDark = theme === 'dark'

  const info = data?.Information || {}

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ee4177eb-56fe-44d7-b349-49f71b26f049',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
      } else setSuccess(false)
    } catch {
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const socials = [
    { icon: FaGithub, link: info.github },
    { icon: FaLinkedin, link: info.linkedin },
    { icon: FaTwitter, link: info.twitter },
    { icon: FaFacebook, link: info.facebook },
    { icon: FaWhatsapp, link: info.whatsapp ? `https://wa.me/+${info.whatsapp.replace(/\D/g, '')}` : null },
  ]

  return (
    <section
      id="contact"
      className={`relative min-h-[100dvh] flex items-center justify-center px-6 md:px-16 py-20 
        ${isDark
          ? 'bg-gradient-to-b from-[#ffffff0e] via-gray-900 to-black text-gray-100'
          : 'bg-gradient-to-b from-gray-200 via-white to-gray-200 text-gray-900'}`}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            Have a question, an idea, or want to collaborate? Fill the form or use the
            contact info below.
          </p>

          <div className="space-y-4">
            {info.email && (
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-indigo-500" />
                <a href={`mailto:${info.email}`} className="hover:underline">
                  {info.email}
                </a>
              </div>
            )}
            {info.contact && (
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-indigo-500" />
                <a href={`tel:${info.contact}`} className="hover:underline">
                  +{info.contact}
                </a>
              </div>
            )}
            {info.address && (
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span>{info.address}</span>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              {socials.map((s, idx) =>
                s.link ? (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border backdrop-blur-md
                      ${isDark
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/50 border-gray-300 text-gray-800'}
                      hover:bg-indigo-500 hover:text-white transition-all`}
                  >
                    <s.icon size={20} />
                  </a>
                ) : null
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-8 shadow-xl backdrop-blur-xl border border-white/10
            ${isDark ? 'bg-white/5' : 'bg-white/70'}`}
        >
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full font-semibold shadow-lg 
                bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
            {success === true && (
              <p className="text-green-500 text-sm">Message sent successfully ✅</p>
            )}
            {success === false && (
              <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default Footer
