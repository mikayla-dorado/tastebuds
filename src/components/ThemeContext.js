import React, { createContext, useContext, useState, useEffect } from "react"
import picnic from "../../src/images/picnic2.webp"
import graypicnic from "../../src/images/graypicnic.webp"

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [backgroundImage, setBackgroundImage] = useState(picnic)


    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            setBackgroundImage(graypicnic)
        } else {
            document.documentElement.classList.remove('dark')
            setBackgroundImage(picnic)
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, backgroundImage }}>
            {children}
        </ThemeContext.Provider>
    )
}