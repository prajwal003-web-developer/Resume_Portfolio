"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useData from "../Stores/Data";
import Link from "next/link";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const MobNav = () => {
  const theme = useData((s) => s.theme);
  const [activeSection, setActiveSection] = useState("home");

  // Intersection Observer to detect active section
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

  return (
    <div
      className={`flex flex-col justify-between gap-3  ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
    >
        <h1 className="p-3 shadow shadow-gray-900 ">
            Navbar
        </h1>
      {navLinks.map((itm, idx) => (
        <motion.div
          key={itm.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.15, duration: 0.4 }}
        >
          <Link
            href={`#${itm.id}`}
            className={`block px-3 py-2 rounded-md font-medium text-lg transition-all duration-300 mx-3 ${
              activeSection === itm.id
                ? theme === "dark"
                  ? "bg-[#ffffff20] shadow-inner"
                  : "bg-gray-200 shadow"
                : ""
            }`}
          >
            {itm.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default MobNav;
