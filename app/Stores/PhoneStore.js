import { create } from "zustand";


export const usePhoneStroe = create((set)=>({
    isPhoneOpen:false,
    isNavbarOpen:false,
    isCallOpen:false,
    isHomePage:true,

    setIsHomePage:(status)=>(set({isHomePage:status})),
    setIsPhoneOpen:(status)=>(set({isPhoneOpen:status})),
    setIsNavbarOpen:(status)=>(set({isNavbarOpen:status})),
    setIsCallOpen:(status)=>(set({isCallOpen:status})),
    ClosePhone:()=>(set({
        isPhoneOpen:false,
        isNavbarOpen:false,
        isCallOpen:false,
        isHomePage:true
    }))
}))