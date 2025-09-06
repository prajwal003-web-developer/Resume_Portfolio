"use client";

import React, { useEffect, useRef, useState } from "react";
import useData from "../Stores/Data";
import { useAiStore } from "../Stores/AiStore";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClear, MdSend } from "react-icons/md";
import { usePhoneStroe } from "../Stores/PhoneStore";

const Ai = () => {
  const theme = useData((s) => s.theme);

  const messages = useAiStore((s) => s.Messages);
  const setMessages = useAiStore((s) => s.setMessages);
  const isOpen = useAiStore((s) => s.isOpen);

   const isMobileOpen = usePhoneStroe((s) => s.isPhoneOpen);
  const setIsOpen = useAiStore((s) => s.setIsOpen);

  const [input, setInput] = useState("");

  const messageBox = useRef()

  useEffect(()=>{
    const el = messageBox.current

    if (el) {
    el.scrollTop = el.scrollHeight;
  }
  },[messages,isOpen])

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages({ sender: "user", text: input });
    try {
      const res = await fetch(`/api/get?question=${input}`)
      const data = await res.json()

      const ai = data.answer

      setMessages({sender:'Ai',text:ai})
    } catch (error) {
      console.log(error)
    }finally{

    }
    setInput("");
  };

  if(isMobileOpen) return

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, x: 200, y: 200, scale: 0 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, y: 200, scale: 0 }}
            transition={{ duration: 0.7 }}
            className={`fixed flex flex-col z-30 bottom-6 right-8 p-1 px-3 rounded 
              w-[87vw] h-[35rem] md:w-[30rem] shadow 
              ${theme === "light" ? "bg-gray-200 shadow-gray-600" : "bg-[#0e0e0e] shadow-gray-900"}`}
          >
            {/* Header */}
            <div className="flex justify-between p-2 ">
              <div className="flex gap-1 justify-center items-center">
                <img
                  src="/ChatBot.png"
                  alt="Error"
                  className="h-9 w-9 rounded-full object-contain"
                />
                <b className="font-mono select-none">P_Bot</b>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <MdOutlineClear
                  size={"1.6rem"}
                  className="cursor-pointer hover:text-red-600"
                />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messageBox}
              className={`flex-1 overflow-y-auto noScrollBar p-2 shadow-inner 
                ${theme === "light" ? "bg-gray-300" : "bg-[#171616]"}`}
            >
              {messages.length === 0 ? (
                <p className="text-gray-500 h-full flex justify-center items-center text-xl">Know About Me,Ask P_Bot</p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 my-1 rounded ${
                      msg.sender === "user"
                        ? "bg-gray-700 text-white self-end"
                        : "bg-gray-400 text-black self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex p-1 items-center border border-gray-600 mt-1"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-1 outline-none bg-transparent"
                placeholder="Type Here"
              />
              <button type="submit" className="cursor-pointer">
                <MdSend size={"1.3rem"} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
  <AnimatePresence>
      {/* Floating Button */}
      {!isOpen && (
      
        <motion.button
        key={"ChatButton"}
        initial={{
            opacity:0,
            scale:0
        }}

        animate={{
            opacity:1,
            scale:1
        }}
        exit={{
            opacity:[1,0],
            scale:[1,0]
        }}
         transition={{
            duration:.9
         }}
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-8 z-30 h-11 w-11 rounded-full cursor-pointer shadow flex justify-center items-center active:shadow-none ${
            theme === "light"
              ? "bg-gray-300 shadow-gray-500"
              : "bg-[#2c2b2bfc] shadow-gray-100"
          }`}
        >
          <img src="/ChatBot.png" alt="Error" className="h-10 w-10" />
        </motion.button>
        
      )}
      </AnimatePresence>
    </>
  );
};

export default Ai;
