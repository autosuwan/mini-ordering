import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { PaymentProvider } from './context/PaymentContext';
import Home from './store/home';
import Cart from './store/cart';
import Information from './store/order/information';
import Payment from './store/order/payment';
import Bill from './store/bill';
import SearchBill from './store/searchBill';
import SellerHome from './store/seller/home';
import SellerBill from './store/seller/bill';
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
    <CartProvider>
        <PaymentProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/s/:store_id" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order/information" element={<Information />} />
                    <Route path="/order/payment" element={<Payment />} />
                    <Route path="/bill/:order_id" element={<Bill />} />
                    <Route path="/searchBill" element={<SearchBill />} />
                    <Route path="/seller/:store_id" element={<SellerHome />} />
                    <Route path="/seller/:store_id/bill/:order_id" element={<SellerBill />} />
                </Routes>
            </BrowserRouter>
        </PaymentProvider>
    </CartProvider>
);
