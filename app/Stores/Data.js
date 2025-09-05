import { create } from "zustand";

const useData = create((set) => ({
  data: {},

  setData: (newData) =>
    set(() => ({
      data: newData,
    })),
    theme: 'light',
    setTheme:(layout)=>set(()=>({
        theme:layout
    })),

    IsAnimated:false,
    setIsAnimated:()=>set(()=>({
      IsAnimated:true
    }))
}));

export default useData;
