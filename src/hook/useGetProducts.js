import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";

export default function useGetProducts(store_id) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!store_id) return;

        async function fetchProducts() {
            setLoading(true);
            setError(null);

            try {
                const data = await getAllProducts(store_id);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [store_id]);

    return { products, loading, error };
}
