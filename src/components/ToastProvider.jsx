import React, { createContext, useContext, useState } from "react"
import ToastContainer from "./ToastContainer"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([])

    // Add new toast
    const addToast = (message, type = "info", duration = 3000) => {

        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        // Auto remove after duration
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }

    // Remove manually
    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)