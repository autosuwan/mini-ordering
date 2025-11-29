import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        description: ''
    });
    const [storeId, setStoreId] = useState(null);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedCustomerInfo = localStorage.getItem('customerInfo');
        const savedStoreId = localStorage.getItem('storeId');
        const savedOrderId = localStorage.getItem('orderId');

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        if (savedCustomerInfo) {
            setCustomerInfo(JSON.parse(savedCustomerInfo));
        }
        if (savedStoreId) {
            setStoreId(savedStoreId);
        }

        if (savedOrderId) {
            setOrderId(savedOrderId);
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    }, [customerInfo]);

    useEffect(() => {
        if (storeId) {
            localStorage.setItem('storeId', storeId);
        }
    }, [storeId]);

    useEffect(() => {
        if (orderId) {
            localStorage.setItem('orderId', orderId);
        }
    }, [orderId]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const items = prevCart.find(item => item.id === productId);

            if (!items) return prevCart;

            if (items.quantity > 1) {
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item);
            }
            else {
                return prevCart.filter(item => item.id !== productId);
            }
        });
    };

    const updateCustomerInfo = (info) => {
        setCustomerInfo(prev => ({ ...prev, ...info }));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCart([]);
        setCustomerInfo({ name: '', phone: '', description: '' });
        localStorage.removeItem('cart');
        localStorage.removeItem('customerInfo');
        // Note: We usually don't clear storeId on clearCart unless the user is leaving the store
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            customerInfo,
            storeId,
            setStoreId,
            orderId,
            setOrderId,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalItems,
            getTotalPrice,
            updateCustomerInfo
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
