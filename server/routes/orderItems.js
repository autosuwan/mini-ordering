import express from "express";
import { addRecords, fetchTableData } from "../services/grist.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        let recordsData = [];

        if (body.products && Array.isArray(body.products)) {
            recordsData = body.products;
        } else {
            recordsData = [body];
        }

        const records = await addRecords('OrderItems', recordsData);

        if (records && records.length > 0) {
            res.json({ ids: records, count: records.length });
        } else {
            throw new Error("Failed to create order item records");
        }
    } catch (error) {
        console.error("Error creating order item:", error);
        res.status(500).json({ message: "Error creating order item" });
    }
});

router.get("/", async (req, res) => {
    try {
        const items = await fetchTableData('OrderItems');
        res.json(items);
    } catch (error) {
        console.error("Error fetching order items:", error);
        res.status(500).json({ message: "Error fetching order items" });
    }
});

export default router;
