import React from "react"
import Toast from "./Toast"

const ToastContainer = ({ toasts, removeToast }) => {

    return (
        <div className="fixed top-5 right-5 flex flex-col space-y-2 z-50">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} removeToast={removeToast} />
            ))}
        </div>
    )
}

export default ToastContainer