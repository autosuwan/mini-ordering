import express from 'express';
import { fetchTableData } from '../services/grist.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const store_id = req.params.id;
        const stores = await fetchTableData('Stores');

        const store = stores.find(
            (s) => String(s.store_id) === String(store_id)
        );

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.json(store);

    } catch (error) {
        res.status(500).json({ message: "Error fetching stores" });
    }
});

export default router;