import { useState, useEffect } from "react";
import { getOrder } from "../api/order";

export default function useGetOrder(id) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        getOrder(id)
            .then((data) => {
                setOrder(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return { order, loading, error };
}