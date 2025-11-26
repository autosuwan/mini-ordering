import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './customer/home';
import Cart from './customer/cart';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@fontsource/noto-sans-thai/300.css';
import '@fontsource/noto-sans-thai/400.css';
import '@fontsource/noto-sans-thai/700.css';
import '@fontsource/noto-sans-thai/900.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
