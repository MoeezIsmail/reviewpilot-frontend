import React, { createContext, useContext, useState, useRef, useCallback } from "react"
import ToastContainer from "./ToastContainer"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])
    const timersRef = useRef({})

    const removeToast = useCallback((id) => {
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id])
            delete timersRef.current[id]
        }
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const addToast = useCallback((message, type = "info", duration = 3000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        timersRef.current[id] = setTimeout(() => {
            delete timersRef.current[id]
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)
