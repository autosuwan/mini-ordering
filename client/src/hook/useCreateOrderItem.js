import { useState } from "react";
import { createOrderItem } from "../api/orderItems";
import useCreateOrder from "./useCreateOrder";

export default function useCreateOrderItem() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { create: createOrder } = useCreateOrder();

    const create = async (itemPayload, orderDetails) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createOrderItem(itemPayload);
            if (response && response.ids) {
                const createdOrder = await createOrder({
                    ...orderDetails,
                    items: ["L", ...response.ids]
                });
                return createdOrder; // Return the created order with order_id
            }
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { create, loading, error };
}
