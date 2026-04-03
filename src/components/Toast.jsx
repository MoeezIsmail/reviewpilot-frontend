import React from "react"
import { X } from "lucide-react"

const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500"
}

const Toast = ({ id, message, type, removeToast }) => {
    return (
        <div className={`flex items-center justify-between p-4 gap-4 rounded-xl shadow-lg text-white ${colors[type]}`}>
            <span>{message}</span>
            <X
                size={22}
                onClick={() => removeToast(id)}
                className={'cursor-pointer'}
            />
        </div>
    )
}

export default Toast