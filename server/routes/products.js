import express from "express";
import { fetchTableData } from "../services/grist.js";

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await fetchTableData('Products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all products" });
    }
});

// Get products by store ID
router.get('/store/:storeId', async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const products = await fetchTableData('Products');
        const stores = await fetchTableData('Stores');

        // Create a map of store row IDs to store data
        const storeMap = new Map(stores.map(store => [store.id, store]));

        // Filter products by matching store_id (which is a reference to Stores table row ID)
        // We need to check both the reference ID and the actual store's id/code
        const storeProducts = products.filter((p) => {
            const storeData = storeMap.get(p.store_id);

            // Match by reference ID or by store's actual ID field
            return String(p.store_id) === String(storeId) ||
                (storeData && String(storeData.id) === String(storeId)) ||
                (storeData && String(storeData.store_id) === String(storeId));
        });

        // Return empty array if no products found (not an error)
        res.json(storeProducts);

    } catch (error) {
        console.error('Error in /store/:storeId:', error);
        res.status(500).json({ message: "Error fetching products by store" });
    }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await fetchTableData('Products');

        const product = products.find(
            (p) => String(p.id) === String(productId)
        );

        if (!product) {
            return res.status(404).json({
                message: `Product ID ${productId} not found`
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

export default router;
