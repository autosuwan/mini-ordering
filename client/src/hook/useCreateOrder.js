import { useState } from "react";
import { createOrder } from "../api/order";

export default function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const create = async (order) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await createOrder(order);
            setResult(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { create, loading, error, result };
}