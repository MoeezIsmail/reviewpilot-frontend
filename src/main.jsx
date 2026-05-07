import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastProvider} from "./components/toast/ToastProvider.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ReviewsProvider} from "./context/ReviewsContext.jsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <BrowserRouter>
                    <ReviewsProvider>
                        <App/>
                    </ReviewsProvider>
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    </StrictMode>,
)
