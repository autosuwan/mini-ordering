import express from 'express';
import { addRecords, fetchTableData } from '../services/grist.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const orderData = req.body;
        // Grist addRecords expects an array of records
        const recordIds = await addRecords('Orders', [orderData]);

        // recordIds is an array of created record IDs, e.g. [123]
        if (recordIds && recordIds.length > 0) {
            const rowId = recordIds[0];

            // Fetch the created order back to get formula-generated fields like order_id
            const orders = await fetchTableData('Orders');
            const createdOrder = orders.find(order => order.id === rowId);

            if (createdOrder) {
                res.json(createdOrder);
            } else {
                throw new Error("Failed to fetch created order");
            }
        } else {
            throw new Error("Failed to create order record");
        }
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order" });
    }
});

router.get("/store/:store_id", async (req, res) => {
    try {
        const storeId = req.params.store_id;
        const orders = await fetchTableData('Orders', { store_id: storeId });

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const orders = await fetchTableData('Orders');

        // Find by row ID (numeric) or order_id (string from formula)
        const order = orders.find(o =>
            String(o.id) === String(orderId) ||
            String(o.order_id) === String(orderId)
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Error fetching order" });
    }
});

export default router;