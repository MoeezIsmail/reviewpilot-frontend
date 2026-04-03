import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastProvider} from "./components/ToastProvider.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ReviewsProvider} from "./context/ReviewsContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <ReviewsProvider>
                    <App/>
                </ReviewsProvider>
            </ToastProvider>
        </AuthProvider>
    </StrictMode>,
)
