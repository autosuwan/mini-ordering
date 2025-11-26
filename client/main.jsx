import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './store/home';
import Cart from './store/cart';
import Information from './store/order/information';
import Payment from './store/order/payment';
import Bill from './store/bill';
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
                <Route path="/order/information" element={<Information />} />
                <Route path="/order/payment" element={<Payment />} />
                <Route path="/bill" element={<Bill />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
