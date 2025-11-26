import express from "express";
import { fetchTableData } from "../services/grist.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await fetchTableData('Products');
    res.json(products);
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
