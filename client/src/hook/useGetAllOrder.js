import { useEffect, useState } from "react";
import { getOrders } from "../api/order";

export default function useGetAllOrder(store_id) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getOrders(store_id);
                setOrders(orders);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return { orders, loading, error };
}