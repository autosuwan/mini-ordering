import { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const savedPayment = localStorage.getItem('paymentData');
        if (savedPayment) {
            try {
                setPaymentData(JSON.parse(savedPayment));
            } catch (e) {
                console.error("Failed to parse payment data", e);
            }
        }
    }, []);

    useEffect(() => {
        if (paymentData) {
            localStorage.setItem('paymentData', JSON.stringify(paymentData));
        } else {
            localStorage.removeItem('paymentData');
        }
    }, [paymentData]);

    const setPayment = (data) => {
        setPaymentData(data);
    };

    const clearPayment = () => {
        setPaymentData(null);
    };

    return (
        <PaymentContext.Provider value={{
            paymentData,
            setPayment,
            clearPayment
        }}>
            {children}
        </PaymentContext.Provider>
    );
}

export function usePayment() {
    const context = useContext(PaymentContext);
    if (context === undefined) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
}