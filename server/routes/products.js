import express from "express";
import { fetchTableData } from "../services/grist.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await fetchTableData('Products');
    res.json(products);
});

// Get products by store ID - MUST be before /:id route
router.get('/store/:storeId', async (req, res) => {
    try {
        const products = await fetchTableData('Products');
        const storeId = req.params.storeId;

        // Filter products by store ID
        const storeProducts = products.filter(p => p.store_id == storeId);

        if (storeProducts.length > 0) {
            res.json(storeProducts);
        } else {
            res.status(404).json({ message: 'No products found for this store' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by store' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const products = await fetchTableData('Products');

        const product = products.find(p => p.id == req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

export default router;
