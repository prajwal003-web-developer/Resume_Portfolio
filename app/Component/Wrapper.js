'use client'
import React, { useEffect, useState } from 'react'
import useData from '../Stores/Data'
import LoadingComponent from './LoadingComponent'
import Side from './Side'
import Ai from './Ai'
import Mobile from './Mobile'

const Wrapper = ({ children }) => {
    const setTheme = useData(s => s.setTheme)

    const theme = useData(s=>s.theme)

    const setData = useData(s => s.setData)

    const IsAnimated = useData(s=>s.IsAnimated)

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light'
        setTheme(theme)
    }, [])

    const [Loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await fetch("https://portfolio-helper.vercel.app/api/getmydata/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNpcnByYWp3YWxuZXVwYW5lQGdtYWlsLmNvbSIsImlhdCI6MTc1NTMzOTU2MX0.u1kBjQqa50emeakCeWJk0r0ibtmeUUedrG4a-SqSxWk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "prajwalneupane",
                    password: "12345678"
                })
            })

            const data = await res.json()

            setData(data)

            console.log(data)
        } catch (error) {
            console.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect( () => {
        fetchData()
    }, [])



    if (Loading || !IsAnimated) return <LoadingComponent />
    return (
        <div className={`min-h-[100dvh] max-w-[100vw] overflow-clip ${theme=='light'?'bg-white text-black':'bg-black text-white'} transition-colors duration-500 `}>
            <Side/>
            <Ai/>
            <Mobile/>
            {children}
        </div>
    )
}

export default Wrapper