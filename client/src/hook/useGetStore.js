import { useEffect, useState } from "react";
import { getStoreByStoreId } from "../api/store";

export default function useGetStore(store_id) {
    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!store_id) return;

        async function fetchStore() {
            setLoading(true);
            setError(null);

            try {
                const data = await getStoreByStoreId(store_id);
                setStore(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStore();
    }, [store_id]);

    return { store, loading, error };
}
