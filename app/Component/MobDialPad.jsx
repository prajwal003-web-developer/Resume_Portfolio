"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiArrowLeft } from "react-icons/fi";
import useData from "../Stores/Data";

/**
 * MobDialPad
 * - Dummy dial pad styled for a classic Android phone keypad look (J1/J2-ish)
 * - Number display is NOT editable by keyboard (readOnly + keyboard/paste prevented)
 * - Use the buttons to enter numbers, backspace, clear, or "call" (demo only)
 */

const layout = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

export default function MobDialPad() {


  // Prevent keyboard input / paste on the display input
 

  const onPress = (val) => {
    setNumber((s) => (s + val).slice(0, 25)); // cap length
  };

  const backspace = () => setNumber((s) => s.slice(0, -1));




  const data = useData((s)=>s.data)

    const [number, setNumber] = useState(data.Information.contact);

  return (
    <div className="p-2 ">
      {/* Display / Header */}
      <div
        className="rounded-2xl p-4 mb-4 shadow-lg flex-1 text-center text-xl h-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        }}
      >
        {number}

      </div>

      {/* Dial pad */}
      <div className="rounded-2xl p-3 shadow-inner bg-transparent">
        <div className="grid grid-cols-3 gap-3">
          {layout.flat().map((key) => {
            // label mapping for small letters (phone-like) for numbers 2-9
            const lettersMap = {
              "2": "ABC",
              "3": "DEF",
              "4": "GHI",
              "5": "JKL",
              "6": "MNO",
              "7": "PQRS",
              "8": "TUV",
              "9": "WXYZ",
            };
            const small = lettersMap[key] || (key === "*" ? "" : key === "#" ? "" : "");
            return (
              <motion.button
                key={key}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => onPress(key)}
                aria-label={`Dial ${key}`}
                className="flex flex-col items-center justify-center gap-1 py-1 rounded-xl shadow-md bg-white/6 hover:bg-white/10 active:scale-95 transition"
              >
                <div className="text-lg md:text-2xl font-semibold">{key}</div>
                <div className="text-[10px] text-gray-400">{small}</div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom actions: backspace, call */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={backspace}
            type="button"
            aria-label="Backspace"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/6 bg-white/4 hover:bg-white/8 transition"
          >
            <FiArrowLeft size={18} />
            <span className="text-sm">Delete</span>
          </motion.button>

          <motion.a
            href={`tel:+${data?.Information?.contact}`}
            whileTap={{ scale: 0.98 }}
            type="button"
            aria-label="Call"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            <FiPhone size={18} />
            <span className="text-sm font-semibold">Call</span>
          </motion.a>
        </div>
      </div>

    </div>
  );
}
